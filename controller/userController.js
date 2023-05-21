import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const authUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {

        res.status(201).json({
            success: true,
            error: null,
            message: 'User Logged In',
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
            }
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email / Password')
    }

    
    res.status(200).json({message: 'Auth user'})
})

const registerUser = asyncHandler(async (req, res) => {

    const {name, email, password, username} = req.body

    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name, email, password, username
    })
    
    if(user) {
        generateToken(res, user._id)
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        })
    } else {
        res.status(400)
        throw new Error('Invalid Data')
    }
    
    res.status(200).json({message: 'User Registered'})
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'Logged Out'})
})

const getUser = asyncHandler(async (req, res) => {

    const {_id, name, email} = req.user
    const user = {
        id: _id,
        name: name,
        email: email
    }
    
    res.status(200).json(user)
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;

        if(req.body.password) {
            user.password = req.body.password;
        }
        const {_id, name, email} = await user.save();
        const updated = {
            id: _id,
            name: name,
            email: email
        }
        res.status(200).json(updated)
        
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

export {
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    getUser
}