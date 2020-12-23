const express = require('express');
const router = express.Router();

const Actor = require('../models/actor');

router.get('/:id', async (req, res) => {
    try {
        const actor = await Actor.findById(parseInt(req.params.id));
        res.json(actor);
    } catch (err) {
        res.status(400).send({err});
    }
})

module.exports = router;
