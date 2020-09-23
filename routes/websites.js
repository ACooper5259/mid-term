const { response } = require('express');
const express = require('express');
const router  = express.Router();

const getAllWebsites = function(guest_id, db) {
  console.log('guest_id',guest_id);
  const queryString = `SELECT users.email, websites.url, loginName, websites.password, category
  FROM websites
  JOIN users ON websites.user_id = users.id
  WHERE user_id = $1
  LIMIT 5;`;

  return db.query(queryString, [guest_id])
  .then(data => {
    return data.rows;
  })
  .catch(err => { return console.log('query error:', err); })

}

const addWebsite = function(website, db) {
  const queryString = `insert into websites (user_id, url, password, loginName, category) values ($1, $2, $3, $4, $5);`;

  const valueArray = [];
  for (const key in website) {
    valueArray.push(website[key]);
  }

  return db.query(queryString, valueArray)
    .then(data => data.rows)

}

module.exports = (db) => {
  router.get('/', (req, res) => {
    const logedInUser = req.session.userID;
    console.log('cookie',req.session.userID);
    console.log('login user?',logedInUser);
    if (!logedInUser) {
      res.json({ error: "login first" });
      return;
    }
    getAllWebsites(logedInUser, db)
    .then(websites => res.json({ websites }))
    .catch(e => {
      console.error('catch',e);
      res.send(e)
    });
  });

  router.post('/', (req, res) => {
    const newWebsite = req.body;
    console.log('Inside req.body',newWebsite);

    addWebsite(newWebsite, db)
      .then(message => {
        return res.json( {message: "New information is saved"} );
      }).catch(err => {
        return res
          .status(500)
          .json({ error: err.message });
      });

  })

  router.patch('/:user_id', (req, res) => {
    const { url, password, loginName, category_id, icon } = req.body;
    const queryString = `UPDATE websites SET url = $1, password = $2, category_id = $3, icon = $4 WHERE user_id = $5;`;

    db.query(queryString, [ url, password, loginName, category_id, icon, req.params.user_id])
      .then((response) => {
        res.json( { success: true, post: response.rows[0] });
      })
      .catch((err) => {
        res.json({ success: false, error: err });
      });

  });

  router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM websites WHERE id = $1;';
    db.query(query, [req.params.id])
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ success: false, error: err });
      });
  });

  return router;
};
