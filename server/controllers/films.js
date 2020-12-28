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

router.get('/:id', async (req, res) => {
    try {
        const film = await Film.findById(parseInt(req.params.id));
        res.json(film);
    } catch(err) {
        res.status(404).json({err});
    }
})

router.post('/', async (req, res) => {
    try {
        const film = await Film.create(req.body.name, req.body.year, req.body.genre, req.body.rating);
        res.json(film);
    } catch(err) {
        res.status(400).json({err});
    }
})

router.patch('/:id', async(req, res) => {
    try {
        const film = await Film.findById(parseInt(req.params.id));
        const updatedFilm = await film.update(req.body.rating);
        res.json({film: updatedFilm});
    } catch(err) {
        res.status(500).json({err});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const film = await Film.findById(parseInt(req.params.id));
        await film.destroy();
        res.status(204).json('Film deleted');
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;