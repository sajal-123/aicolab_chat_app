import User from "../models/User.Model";
import bcrypt from 'bcryptjs'; // Install bcryptjs for password hashing
import { Document } from 'mongoose'; // To ensure correct type for User

export const createUser = async (email: string, password: string): Promise<any> => {
        const newUser = new User({ email, password });
        await newUser.save();
        return newUser;
    };
