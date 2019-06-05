// Requires
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Get all shifts
router.get('/', (req, res) => {
    let queryString = `SELECT shift.id, start_time, end_time, name, role, email, phone 
    FROM "shift" JOIN "user" on "user".id = "shift".emp_id ORDER BY "start_time";`
    pool.query(queryString)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log("Error in GET, all shifts", error);
            res.sendStatus(500);
        })
})

module.exports = router;