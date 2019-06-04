// Requires
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Get all shifts
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "shift" JOIN "user" on "user".id = "shift".emp_id;`)
        .then(result => {
            res.send(result);
        }).catch(error => {
            console.log("Error in test GET", error);
            res.sendStatus(500);
        })
})

module.exports = router;