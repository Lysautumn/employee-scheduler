const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Query to get employee names for dropdown
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

// Query to get all shifts for selected employee
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let queryString = `SELECT shift.id, start_time, end_time, name, role, email, phone 
    FROM "shift" JOIN "user" on "user".id = "shift".emp_id WHERE "user".id = $1 ORDER BY "start_time";`
    pool.query(queryString, [id])
        .then( result => {
            res.send(result.rows);
        }).catch( error => {
            console.log('Error in GET, employee shifts', error);
            res.sendStatus(500);
        })
})

module.exports = router;