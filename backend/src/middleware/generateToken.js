const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

const JWT_SECRET = process.env.JWT_SECRET_KEY

const generateToken = async (userid) => {
    try {
        const user = await User.findById(userid);
        if(!user){
            throw new Error("User not found");
        }

        const token = jwt.sign({userid: user.id, role: user.role}, JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    } catch (error) {
        
    }
}

module.exports = generateToken;