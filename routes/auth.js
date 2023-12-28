const express = require('express')
const router = express.Router()


//SignUp
router.post('/signup', async(req, res) => {
    res.send('Sign Up')
})

//Login
router.post('/login', async(req, res) => {
    res.send('Log In')
})

module.exports = router