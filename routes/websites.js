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

};

const getCategory = function(user_id,category, db) {
  const queryString = `SELECT users.email, websites.*
  FROM websites
  JOIN users ON websites.user_id = users.id
  WHERE user_id = $1
  AND category = $2
  LIMIT 10;`;

  return db.query(queryString, [user_id, category])
  .then(data => {
    return data.rows;
  })
  .catch(err => { return console.log('query error:', err); })

};

const getCustomCategory = function(user_id, db) {
  const queryString = `SELECT users.email, websites.*
  FROM websites
  JOIN users ON websites.user_id = users.id
  WHERE user_id = $1
  AND category NOT IN ('Shopping', 'Education', 'Social Media', 'Information', 'Entertainment')
  LIMIT 10;`;

  return db.query(queryString, [user_id])
  .then(data => {
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
  //route for display all websites for user
  router.get('/', (req, res) => {
    const logedInUser = req.session.userID;
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

  //Route for filtering the websites by category
  router.get('/:category', (req, res) => {
    const categoryName = req.params.category;
    console.log('category is ',categoryName)
    const logedInUser = req.session.userID;

    if(categoryName === 'All') {
      getAllWebsites(logedInUser, db)
      .then(websites => res.json({ websites }))
      .catch(e => {
        console.error('catch',e);
        res.send(e)
    });

    } else if (categoryName === 'Custom') {
      console.log('custom')
      getCustomCategory(logedInUser, db)
      .then(websites => res.json({ websites }))
      .catch(e => {
        console.error('catch',e);
        res.send(e)
      });

    } else {
      getCategory(logedInUser, categoryName, db)
      .then(websites => res.json({ websites }))
      .catch(e => {
        console.error('catch',e);
        res.send(e)
      });
    }

  });

  //Route for adding new website for user
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

  // Edit route for website
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

  //Route for delete website
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
