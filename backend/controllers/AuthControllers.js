const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/user");

const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({ email })
        if(user){
            return res.status(409).json({message: 'This email is already exist',success: false})
        }
        const userModel = new User({ name, email, password })   
        // Ecrypt the password 
        userModel.password = await bcrypt.hash(password, 10);
        // Save the user in database 
        await userModel.save();
        res.status(201).json({message: 'signup successful', success: true})
    } catch (error) {
        res.status(500).json({message: 'Inter server error', success: false});
    }
}


const login = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({ email })
        const errMsg = 'Authenticatin failed'
        if(!user){
            return res.status(409).json({message: errMsg,success: false})
        }
        
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            return res.status(403)
                          .json({message: errMsg, success: false})
        }
        
        const jwtToken = jwt.sign(
            {email: user.email, _id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200)
                .json(
                    {
                        message: 'signup successful', 
                        success: true,
                        jwtToken,
                        email,
                        name: user.name
                    })
    } catch (error) {
        res.status(500).json({message: 'Inter server error', success: false});
    }
}

module.exports = {signup,login}