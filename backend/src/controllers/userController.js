import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export async function registerUser(req, res) {
    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email});
        const hashedPassword = await bcrypt.hash(password, 10);

        if(existingUser) {
            return res.status(500).json({message: 'User already exists'});
        }

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({message: 'Failed to create user'});
        console.log(error)
    }
};

export async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password);

        if(!user) {
            return res.status(400).json({message: 'User not found'});
        }else if(!isMatch) {
            return req.status(500).json({message: 'Incorrect password'});
        }



    } catch (error) {
        res.status(500).json({message: 'Failed to login'})
    }
}

export async function getUser(req, res) {
    try {
        const users = await User.find().sort({createdAt: -1});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch users'})
        console.log(error)
    }
}

export async function deleteAll(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'User deleted'})
    } catch (error) {
        req.status(500).json({message: 'Failed to delete user'})
    }
}