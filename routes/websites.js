const express = require('express');
const router  = express.Router();

const getAllWebsites = function(guest_id, db) {
  console.log('incoming',guest_id)
  const queryString = `SELECT users.username, loginName, websites.url, websites.password
  FROM websites
  JOIN users ON websites.user_id = users.id
  JOIN organizations ON organization_id = organizations.id
  WHERE username = $1
  LIMIT 5;`;

  return db.query(queryString, [guest_id])
  .then(data => {
    console.log('inside then')
    return data.rows;
  })
  .catch(err => { return console.log('query error:', err); })

}

module.exports = (db) => {
  router.get('/', (req, res) => {
    const logedInUser = 'mzipsell0';
    //req.session.userID;
    console.log('login user?',logedInUser);
    if (!logedInUser) {
      res.json({ error: "login first" });
      return;
    }
    getAllWebsites(logedInUser, db)
    .then(websties => res.json({ websties }))
    .catch(e => {
      console.error('catch',e);
      res.send(e)
    });
  });

  /*
  router.get("/", (req, res) => {
    const logedInUser = req.session.userID;
    console.log(logedInUser);
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
  */

  return router;
};
