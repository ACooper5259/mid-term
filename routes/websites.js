const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let queryString = `SELECT * FROM websites`;
    console.log(queryString);
    db.query(queryString)
      .then(data => {
        const websites = data.rows;
        console.log(websites)
        res.json({ websites });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
