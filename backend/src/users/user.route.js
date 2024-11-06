const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
// const verifyToken = require('../middleware/verifyToken');
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

// all users route
//  router.get("/users", verifyToken, async (req, res) => {
//     res.send({message: "Protected users"})
//  })

// Logout Endpoint
router.post("/logout", async (req, res) =>{
    res.clearCookie('token');
    res.status(200).send({message:' Logged Out Successfully'})
})

// Delete a User
router.delete('/users/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404).send({message:' User Not Found'})
        }
        res.status(200).send({message:'User Deleted Successfully'})
    } catch (error) {
        console.log("Error deleting user", error);
        res.status(500).send({message:"Error deleting user"})
    }
})

// Get all user
router.get('/users', async (req, res) =>{
    try {
        const users = await User.find({}, 'id email role').sort({createdAt: -1});
        res.status(200).send(users)
    } catch (error) {
        console.log("Error fetching user", error);
        res.status(500).send({message:"Error fetching user"})
    }
})

// Update User role
router.put('/users/:id', async(req, res) =>{
    try {
        const {id} =req.params;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(id, {role}, {new: true});
        if(!user){
            return res.status(404).send({message:'User not found'})
        }
        res.status(200).send({message:'User role updated successfully', user})
        
    } catch (error) {
        console.log("Error updating user role", error);
        res.status(500).send({message:"Error updating user role"})
    }
})

// Edit or Update Profile
router.patch('/edit-profile', async (req, res) =>{
    try {
        const {userId, username, profileImage, bio, profession} = req.body;
        if(!userId){
            return res.status(400).send({message:'User Id is required'})
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({message:'User not found'})
        }
          // update profile
        if(username !== undefined) user.username = username;
        if(profileImage !== undefined) user.profileImage = profileImage;
        if(bio !== undefined) user.bio = bio;
        if(profession !== undefined) user.profession = profession;

        await user.save();
        res.status(200).send({message:'Profile Updated Successfully', user :{
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession
        }})

    } catch (error) {
        console.log("Error updating user profile", error);
        res.status(500).send({message:"Error updating user profile"})
    }
})

module.exports = router;