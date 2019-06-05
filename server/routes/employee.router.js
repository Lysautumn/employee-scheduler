const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/employee-names', (req, res) => {
    let queryString = `SELECT id, name FROM "user";`
    pool.query(queryString)
        .then( result => {
            res.send(result.rows);
        }).catch( error => {
            console.log('Error in GET, employee names', error);
            res.sendStatus(500);
        })
})

module.exports = router;