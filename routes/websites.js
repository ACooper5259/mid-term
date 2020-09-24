const { response } = require('express');
const express = require('express');
const router  = express.Router();

const hasAllRequiredParams = (website) => {
  if (website.url && website.password && website.loginname && website.category) {
    return true;
  }
  return false;
}

const getAllWebsites = function(guest_id, db) {
  console.log('guest_id',guest_id);
  const queryString = `SELECT users.email, websites.*
  FROM websites
  JOIN users ON websites.user_id = users.id
  WHERE user_id = $1
  LIMIT 10;`;

  return db.query(queryString, [guest_id])
  .then(data => {
    return data.rows;
  })
  .catch(err => { return console.log('query error:', err); })
}

const getOrganizationId = function(userID, db){
  const queryString = `
  SELECT organization_id
  FROM users
  WHERE id = $1
  `;
  return db.query(queryString, [userID])
  .then(data => {
    return data.rows[0].organization_id;
  })
  .catch(err => { return console.log('query error:', err); })
}

const getCompanyWebsites = function(organizationID, db) {
  const queryString = `
  SELECT users.id as userID, organizations.name as organization, websites.password, websites.loginname, websites.url, websites.category
  FROM users
  JOIN organizations ON organizations.id = users.organization_id
  JOIN websites ON websites.user_id = users.id
  WHERE organizations.id = $1;
  `;
  return db.query(queryString, [organizationID])
  .then(data => {
    console.log(data.rows)
    return data.rows;
  })
  .catch(err => { return console.log('query error:', err); })
}

const addWebsite = function(website, db) {
  const queryString = `insert into websites (user_id, url, password, loginName, category) values ($1, $2, $3, $4, $5);`;

  const valueArray = [website.userID, website.url, website.password, website.loginname, website.category];

  return db.query(queryString, valueArray)
    .then(data => data.rows)

}

module.exports = (db) => {
  router.get('/', (req, res) => {
    const logedInUser = req.session.userID;
    if (!logedInUser) {
      res.json({ error: "login first" });
      return;
    }
    getOrganizationId(logedInUser, db).then(orgID => {
      getCompanyWebsites(orgID, db)
      .then(websites => res.json({ websites }))
      .catch(e => {
        console.error('catch',e);
        res.send(e)
      });
      })
  });

  router.post('/', (req, res) => {
    const newWebsite = req.body;
    if(!hasAllRequiredParams(newWebsite)){
      return res
      .status(500)
      .json({ error: "Please fill out all inputs of the new site form" });
    }
    const userID = req.session.userID;
    newWebsite.userID = userID;
    addWebsite(newWebsite, db)
      .then(message => {
        return res.json( {message: "New information is saved"} );
      }).catch(err => {
        console.log(err.message)
        return res
          .status(500)
          .json({ error: err.message });
      });

  })

  router.patch('/:id', (req, res) => {
    const { url, password, loginname, category } = req.body;
    const queryString = `UPDATE websites SET url = $1, password = $2, loginName = $3, category = $4 WHERE id = $5;`;

    db.query(queryString, [ url, password, loginname, category, req.params.id])
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
