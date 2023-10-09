import User from './db';
import redisClient from './redis';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { port } from './server';
import { ObjectId } from 'mongodb'

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
})
const sendEmail = async (subject, recipients, message) =>{
    try {
        const messageObject = {
            from: 'Samuel',
            to: recipients,
            subject: subject,
            text: message
        }
        const mail = await transporter.sendMail(messageObject)
        console.log('Email successfully sent', mail.response)
    } catch (error) {
        console.log('Email failed', error);
    }
}

class AuthController {
    /*
    * Signup handler using jwt and redis
    */
    static async signup(req, res) {
        const {email, password} = req.body;
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({email, password: hashedPassword, role: 'admin'});
            const result = await user.save();
            // const token = jwt.sign({id: result._id}, process.env.JWT_SECRET);
            // redisClient.client.set(`auth_${token}`, result._id.toString(), 'EX', 60 * 60 * 24);
            res.status(201).json({result});
        } catch (error) {
            if (error.name === 'MongoServerError' && error.code === 11000) res.status(401).json({error: 'User Exists. Please Login Instead'});
            else res.status(500).json({error: 'Server Error'});
        }
}
    /*
    * Login handler using jwt and redis
    */
    static async login(req, res) {
        const { email, password, role } = req.body;
        try {
            const user = await User.findOne({ email, role});
            console.log(user)
            if (!user) res.status(404).json({error: 'Not Found'});
            console.log(user.password)
            if (!await bcrypt.compare(password, user.password)) res.status(403).json({error: 'Password mismatch'});
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            redisClient.client.set(`auth_${token}`, user._id.toString(), 'EX', 60 * 60 * 24);
            res.status(200).json({token, role: user.role});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
}
    static async logout(req, res) {
        const {token} = req.params;
        const key = `auth_${token}`
        try {
            const userId = await redisClient.client.get(key);
            console.log(userId);
            const user = await User.findById({_id: new ObjectId(userId)})
            if (!user) res.status(400).json({error: 'User not found'});
            await redisClient.client.del(key)
            res.status(204).send('Deleted')
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    /**
     * 
     * forgot password: function to handle forgot password of user
     */
    static async forgotPassword(req, res) {
        const {email} = req.body
        try {
            const user = await User.findOne({ email })
            if (!user) res.status(401).json({ error: 'Email not found' });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const key = `auth_${token}`;
            redisClient.client.set(key, user._id.toString(), 'EX', 60 * 60 * 24)
            const userId = await redisClient.client.get(key)
            console.log(userId);
            const resetLink = `http://localhost:${port}/resetPassword/${token}`
            const message = `Click here to reset your password ${resetLink}`
            sendEmail('Password Reset', 'amure387@gmail.com', message)
            res.status(200).json({token})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    /**
     * Reset password for user
     */
    static async resetPassword(req, res) {
        const {password} = req.body;
        const {token} = req.params;
        const key = `auth_${token}`;
        try {
            const userId = await redisClient.client.get(key)
            console.log(userId);
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedUser = await User.findByIdAndUpdate((userId), { password: hashedPassword });
            console.log(updatedUser);
            res.status(200).json(updatedUser);
        await redisClient.client.del(key)
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}
export default AuthController;