import { Request, Response } from 'express';
import { createUser } from '../service/User.service'; // Ensure createUser is a function that handles user creation
import { validationResult } from 'express-validator';
import User from '../models/User.Model';
import bcrypt from 'bcryptjs';
import { redis } from '../config/Redis';
// Register Controller
export const Register = async (req: Request, res: Response): Promise<any> => {
    // Validate the request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the email and password from the request body
    const { email, password } = req.body;

    try {
        if (!email || !password)
            throw new Error('Email and password are required');
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with that email' });
        }

        // Call the service to create the user (assuming createUser function creates the user document)
        const user = await createUser(email, password);

        // Generate JWT token after user creation
        const token = user.generateJWT();

        // Send the created user and token as a response
        return res.status(201).json({
            message: "User created successfully",
            user,
            token,
        });
    } catch (error: any) {
        // Log the error and return a server error response
        console.error('Error creating user:', error);

        return res.status(500).json({
            message: 'Server error, failed to create user',
            error: error.message, // Send back the error message from the exception
        });
    }
};
// Login Controller
export const Login = async (req: Request, res: Response): Promise<any> => {
    // Validate the request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the email and password from the request body
    const { email, password } = req.body;
    console.log(email, password)

    try {
        if (!email || !password)
            throw new Error('Email and password are required');

        // Check if the user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log(user)

        // Validate the password
        const isPasswordValid = await user.isValidPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token after successful login
        const token = user.generateJWT();

        // Send the user and token as a response
        return res.cookie('token', token).status(200).json({
            message: "Login successful",
            user,
            token,
        });
    } catch (error: any) {
        // Log the error and return a server error response
        console.error('Error during login:', error);

        return res.status(500).json({
            message: 'Server error, failed to login',
            error: error.message, // Send back the error message from the exception
        });
    }
};
export const getProfile = async (req: Request, res: Response): Promise<any> => {
    console.log(req.body)
    return res.json(req.body);
};

export const LogoutUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        redis.set(token, "Logout", 'EX', 60 * 60 * 24);

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error: any) {
        console.log("error->",error.message);
        return res.status(500).json(error.message);
    }
}