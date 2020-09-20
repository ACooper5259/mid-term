/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const checkAllUserParamsExist = (user) => {
  if (user.username && user.name && user.password && user.organization_id) {
    return true;
  }
  return false;
}

const checkUserExists = (user, db) => {
  const query =
    `SELECT username
   FROM users
   WHERE username = $1`;
  const queryParams = [user.username];

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
  INSERT INTO users( username, name, password, organization_id)
  VALUES ($1, $2, $3, $4);
  `
  const hashedPassword = bcrypt.hashSync(newUser.password, 5);

  const queryParams = [newUser.username, newUser.name, hashedPassword, newUser.organization_id];
  return db.query(query, queryParams).then(data => {
    return `SUCCESFULLY CREATED USER ${newUser.username}`;
  })
}

const verifyPassword = (username, password, db) => {
  const query = `
  SELECT * FROM users
  WHERE username = $1;
`
  queryParams = [username];

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
        .json({ error: "Request is missing a field (name, username, password, organization_id)" });
    }

    checkUserExists(newUser, db).then(userExists => {
      if (userExists) {
        return res
          .status(500)
          .json({ error: "Username already exists" });
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
    checkUserExists(user, db).then(userExists => {
      if (userExists) {
        verifyPassword(user.username, user.password, db).then (userID => {
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
  return router;
};
