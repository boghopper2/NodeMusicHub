const express = require('express')
const userBase = require('../modles/user')
const router = express.Router()
const UserBase = require('../modles/user')

// Getting all
router.get('/', async(req, res) => {
    try {
        const users = await UserBase.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getUser, (req, res) => {
    res.json(res.userBase)
})

// Creating one
router.post('/', async(req, res) => {
    const userBase = new UserBase({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
    })

    try {
        const newUser = await userBase.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
router.patch('/:id', getUser, async(req, res) => {
    if (req.body.firstName != null) {
        res.userBase.firstName = req.body.firstName
    }
    if (req.body.lastName != null) {
        res.userBase.lastName = req.body.lastName
    }
    try {
        const updatedUser = await res.userBase.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getUser, async(req, res) => {
    try {
        await res.userBase.remove()
        res.json({ message: 'Deleted User' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let userBase
    try {
        userBase = await UserBase.findById(req.params.id)
        if (userBase == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.userBase = userBase
    next()
}


module.exports = router