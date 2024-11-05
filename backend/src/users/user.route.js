const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user =  new User({email, username, password});
        await user.save();
        res.status(201).send({message:"User Registered Successfully!"})

       // console.log(req.body)
    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).send({message:"Error registering user"})
    }
})

// Login User Endpoint
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    //console.log(email, password)
    try {
        const user = await User.findOne({email});
    if(!user) {
        return res.status(404).send({message:'User not found'})
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).send({message:'Password not matched'})
    }

    const token = await generateToken(user.id);
    // console.log("token",token)

    res.cookie('token', token,{
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })

    res.status(200).send({message:"Logged in Successfully", token, user:{
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession
    }})
    } catch (error) {
        console.log("Error logging in user", error);
        res.status(500).send({message:"Error logging in user"})
    }
})

module.exports = router;