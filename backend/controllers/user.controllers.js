import userModel from '../models/user.model.js';
import * as userServices from '../services/user.services.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.services.js';

export const createUserController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userServices.createUser(req.body);
        const token = user.generateAuthToken();
        delete user._doc.password;
        return res.status(201).json({user,token});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const loginUserController = async (req, res) => {
    console.log("jjj")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const isValidPassword = await user.comparePassword(password);
        if(!isValidPassword){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = user.generateAuthToken();
        delete user._doc.password;
        return res.status(200).json({token,user});

    }catch(error){
        console.log(error)
        return res.status(500).json({ error: error.message });
    }

};

export const getProfileUserController = async (req, res) => {
    console.log(req.user);
    return res.status(200).json({user: req.user});

}

export const logoutUserController = async (req, res) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Token not found');
        }
        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
        res.status(200).json({message: 'Logout successfully'});
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

