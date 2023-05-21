import asyncHandler from 'express-async-handler'
import Token from '../models/tokenModel.js'
import jwt from 'jsonwebtoken'

const authUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {

        generateToken(res, user._id)
        
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
                token: {
                    
                }
            }
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email / Password')
    }

    
    res.status(200).json({message: 'Auth user'})
})

const storeToken = asyncHandler(async (req, res) => {

    const {userId } = req.body
    
    const jwtToken = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    const expireTime = 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30;

    const expireAt = new Date(Date.now() + expireTime).toDateString();

    res.cookie('jwt', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: expireTime
    })
    
    const token = await Token.create({
        token: jwtToken, userId, expireAt 
    })
    
    if(token) {
        res.status(201).json({
            success: true,
            error: null,
            message: 'Token Stored',
            data: {
                token: {
                    id: token._id,
                    token: token.token,
                    expireAt: token.expireAt
                }
            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid Data')
    }
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
    storeToken,
    updateUser,
    getUser
}