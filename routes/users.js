/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

const checkAllUserParamsExist = (user) => {
  if (user.username && user.password && user.email) {
    return true;
  }
  return false;
}

const checkUserExists = (user, db) => {
  const query =
    `SELECT email
   FROM users
   WHERE email = $1`;
  const queryParams = [user.email];
  return db.query(query, queryParams)
    .then(data => {
      const matchingUser = data.rows;
      if (matchingUser.length > 0) {
        return true;
      }
      return false;
    })
}

const insertNewUser = async (queryParams, db) => {
  await db.query(`
  INSERT INTO users( email, username, password, organization_id)
  VALUES ($1, $2, $3, $4);`
    , queryParams)

  return `SUCCESFULLY CREATED USER ${queryParams[1]}`;
}

const createNewUser = async (newUser, db) => {
  const hashedPassword = bcrypt.hashSync(newUser.password, 5);
  const orgName = newUser.organization_name;

  let organizationID = await getOrganization(orgName, db);
  if (organizationID) {
    return await insertNewUser([newUser.email, newUser.username, hashedPassword, organizationID], db);
  } else {
    await createOrganization(orgName, db);
    organizationID = await getOrganization(orgName, db);
    return await insertNewUser([newUser.email, newUser.username, hashedPassword, organizationID], db);
  }
}

const getOrganization = async (organizationName, db) => {
  const query =
    `SELECT *
   FROM organizations
   WHERE name = $1`;

  const queryParams = [organizationName];
  try {
    const data = await db.query(query, queryParams);
    if (data.rows.length > 0) {
      return data.rows[0].id;
    }
    return null;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}


const createOrganization = (organizationName, db) => {
  const query =
    `
    INSERT INTO organizations(name)
    VALUES ($1);
    `;
  const queryParams = [organizationName];
  return db.query(query, queryParams);
}

const getUserByEmail = async (email, db) => {
  const data = await db.query(`
  SELECT * FROM users
  WHERE email = $1;`
    , [email]);
  const user = data.rows[0];
  return user;
}


const verifyPassword = async (email, password, db) => {
  const user = await getUserByEmail(email, db);
  const hashedPassword = user.password;

  if (bcrypt.compareSync(password, hashedPassword)) {
    return user.id;
  } else {
    return null;
  }
}

const updatePassword = async (password, userID, db) => {
  const query = `
  UPDATE users
  SET password = $1
  WHERE id = $2;
  `
  const hashedPassword = bcrypt.hashSync(password, 5);
  const queryParams = [hashedPassword, userID];

    await db.query(query, queryParams);
    return { message: `SUCCESFULLY UPDATED PASSWORD for user ${userID}` };
}



module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const data = await db.query(`SELECT * FROM users;`);
      res.json({ users: data.rows })
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message });
    }
  });

  router.post("/", async (req, res) => {
    const newUser = req.body;

    if (!checkAllUserParamsExist(newUser)) {
      return res
        .status(500)
        .json({ error: "Request is missing a field (username, email, password, organization_name)" });
    }

    try {
      const userExists = await checkUserExists(newUser, db);
      if (userExists) {
        return res
          .status(500)
          .json({ error: "email already exists" });
      }
      const userCreationMessage = await createNewUser(newUser, db);
      return res.json(userCreationMessage);
    } catch (e) {
      return res
        .status(500)
        .json({ error: e.message });
    }
  });

  router.post("/login", async (req, res) => {
    const user = req.body;
    try {
      const userExists = await checkUserExists(user, db);
      if (userExists) {
        const loggedInUserID = await verifyPassword(user.email, user.password, db);
        if (loggedInUserID) {
          //Set the session cookie
          req.session.userID = loggedInUserID;
          return res.json({ message: `userID: ${loggedInUserID} logged in!` });
        }
        return res
          .status(401)
          .json({ message: "Invalid credentials" });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ error: e.message });
    }
  });

  router.post('/logout', (req, res) => {
    //Clear session cookie
    req.session = null;
    return res
      .json({ message: "Succesfully logged out" });
  })

  router.post('/password', async (req, res) => {
    if (!req.session.userID) {
      return res
        .status(401)
        .json({ error: "You must be logged in to edit your account password" });
    }

    if (!req.body.password) {
      return res
        .status(422)
        .json({ error: "No password provided in the request body" });
    }

    try{
      const updatePasswordMessage = await updatePassword(req.body.password, req.session.userID, db);
      return res.json(updatePasswordMessage);
    }catch(e){
      return res
      .status(500)
      .json({ error: e.message });
    }
  })
  return router;
};
