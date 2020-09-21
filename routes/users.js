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
  console.log(user)
  if (user.name && user.password && user.email) {
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



const createNewUser = (newUser, db) => {
  const query = `
  INSERT INTO users( email, name, password, organization_name)
  VALUES ($1, $2, $3, $4);
  `
  const hashedPassword = bcrypt.hashSync(newUser.password, 5);

  const queryParams = [newUser.email, newUser.name, hashedPassword, newUser.organization_name];
  return db.query(query, queryParams).then(data => {
    return `SUCCESFULLY CREATED USER ${newUser.name}`;
  })
}

const verifyPassword = (email, password, db) => {
  const query = `
  SELECT * FROM users
  WHERE email = $1;
`
  queryParams = [email];

  return db.query(query, queryParams)
    .then(data => {
      const user = data.rows[0];
      const hashedPassword = user.password;

      if (bcrypt.compareSync(password, hashedPassword)) {
        return user.id;
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log(err)
    });

}

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const newUser = req.body;

    if (!checkAllUserParamsExist(newUser)) {
      return res
        .status(500)
        .json({ error: "Request is missing a field (name, name, password, organization_name)" });
    }

    checkUserExists(newUser, db).then(userExists => {
      if (userExists) {
        return res
          .status(500)
          .json({ error: "name already exists" });
      }

      createNewUser(newUser, db).then(message => {
        return res.json(message);
      }).catch(err => {
        return res
          .status(500)
          .json({ error: err.message });
      });
    })
  });

  router.post("/login", (req, res) => {
    const user = req.body;
    console.log(user)
    checkUserExists(user, db).then(userExists => {
      if (userExists) {
        verifyPassword(user.email, user.password, db).then (userID => {
          if(userID){
            console.log("LOGGED IN")
            console.log(userID)
            req.session.userID = userID;
            return res.json({message: "Logged In!"});
          } else{
            console.log("Wrong Password")
            return res.json({message: "Invalid credentials"});
          }
        })
      } else {
        return res
          .status(500)
          .json({ error: "Invalid credentials" });
      }
    });
  });
  router.post('/logout', (req, res) => {
    req.session = null;
    return res
    .json({ error: "Succesfully logged out" });
  })

  router.post('/password', (req, res) => {
    if(!req.session.userID){
      return res
      .json({ error: "You must be logged in to edit your account password"});
    }
    if(!req.body.password){
      return res
      .json({ error: "No password provided in the request body"});
    }

    const query = `
    UPDATE users
    SET password = $1
    WHERE id = $2;
    `
    const hashedPassword = bcrypt.hashSync(req.body.password, 5);
    const queryParams = [hashedPassword, req.session.userID];

    return db.query(query, queryParams).then(data => {
      console.log("SUCCESS")
      return res.json({message: `SUCCESFULLY UPDATED PASSWORD for user ${req.session.userID}` })
    }).catch(err => {
      return res.json({error: err })
  })})
  return router;
};
