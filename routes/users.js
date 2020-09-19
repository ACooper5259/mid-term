/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

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
    const queryString =
      `SELECT username
       FROM users
       WHERE username = $1
      `
    const queryParams = [req.body.username]
    db.query(queryString, queryParams)
      .then(data => {
        const matchingUser = data.rows;
        if (matchingUser.length > 0) {
          return res
            .status(500)
            .json({ error: "Username already exists" });
        }
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
