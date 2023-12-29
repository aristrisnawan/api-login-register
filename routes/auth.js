const express = require('express')
const router = express.Router()
const User = require('../models/user')


//SignUp
router.post('/signup', async(req, res) => {
    try {
      const {username,password} = req.body
      const user = new User({username,password})
      const data = await user.save() 
      res.status(201).json({data: data , message: 'User registered successfully'}) 
    } catch (error) {
        res.status(500).json({error: 'Internal server Error'})
    }
})

//Login
router.post('/login', async(req, res) => {
    res.send('Log In')
})

module.exports = router