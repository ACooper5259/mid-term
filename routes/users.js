/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const checkAllUserParamsExist = (user) => {
  if(user.username && user.name && user.password && user.organization_id){
    return true;
  }
  return false;
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
    if(!checkAllUserParamsExist(newUser)){
      return res
      .status(500)
      .json({ error: "Request is missing a field (name, username, password, organization_id)"});
    }
    const queryString =
      `SELECT username
       FROM users
       WHERE username = $1
      `
    const queryParams = [newUser.username]
    db.query(queryString, queryParams)
      .then(data => {
        const matchingUser = data.rows;
        if (matchingUser.length > 0) {
          return res
            .status(500)
            .json({ error: "Username already exists" });
        }
        const signupQueryString = `
        INSERT INTO users ( username, name, password, organization_id)
        VALUES ($1, $2, $3, $4);
        `
        const signupQueryParams = [newUser.username, newUser.name, newUser.password, newUser.organization_id];
        db.query(queryString, queryParams)

        return res.json({message: "SUCCESFULLY CREATED USER"});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/login", (req, res) => {
    console.log("login ROUTE WORKS")
    console.log(req.body)
  });
  return router;
};
