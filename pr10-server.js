const express = require('express')
const router = express.Router()

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('./data/pr10-data.json')

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData)
})

router.post('/insertName', (req, res, next) => {
    // Typically you should do some sort of filtering and error checking. This is minimal, and makes sure we're not accepting empty values
    if (req.body.newName !== undefined) {
        const newName = req.body.newName
        const newPower = req.body.newPower
        
        console.log(newName)
        dummyData.avengers.push({ name: newName, power: newPower }) // Push new object into the dummyData
        res.sendStatus(200)
    } 
})

router.get('/', (req, res, next) => {
    res.render('pages/pr10', {
        title: 'Prove Assignment 10',
        path: '/p10'
    })
})

module.exports = router
