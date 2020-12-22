const express = require('express');
const router = express.Router();

const Film = require('../models/film');

// films index route
router.get('/', async (req, res) => {
    try {
        const films = await Film.all;
        res.json({films});
    } catch(err) {
        res.status(500).json({err});
    }
})

module.exports = router;