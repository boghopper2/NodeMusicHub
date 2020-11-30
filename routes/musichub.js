const express = require('express')
const musicBase = require('../modles/musichub')
const router = express.Router()
const MusicBase = require('../modles/musichub')

// Getting all
router.get('/', async(req, res) => {
    try {
        const artists = await MusicBase.find()
        res.json(artists)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getArtist, (req, res) => {
    res.json(res.musicBase)
})

// Creating one
router.post('/', async(req, res) => {
    const musicBase = new MusicBase({
        artist: req.body.artist,
        album: req.body.album,
        genre: req.body.genre,
        albumRunTime: req.body.albumRunTime,
    })

    try {
        const newArtist = await musicBase.save()
        res.status(201).json(newArtist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
router.patch('/:id', getArtist, async(req, res) => {
    if (req.body.artist != null) {
        res.musicBase.artist = req.body.artist
    }
    if (req.body.album != null) {
        res.musicBase.album = req.body.album
    }
    try {
        const updatedArtist = await res.musicBase.save()
        res.json(updatedArtist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getArtist, async(req, res) => {
    try {
        await res.musicBase.remove()
        res.json({ message: 'Deleted Artist' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getArtist(req, res, next) {
    let musicBase
    try {
        musicBase = await MusicBase.findById(req.params.id)
        if (musicBase == null) {
            return res.status(404).json({ message: 'Cannot find artist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.musicBase = musicBase
    next()
}


module.exports = router