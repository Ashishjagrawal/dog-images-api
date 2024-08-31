import { User, IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (userData: Partial<IUser>): Promise<IUser> => {
    if (!userData.username || !userData.password) {
        throw new Error('Username and password are required');
    }
    const user = new User(userData);
    const savedUser = await user.save();
    const userObject = savedUser.toObject();

    // Remove the password field
    userObject.password = ""

    return userObject;
};

export const login = async (username: string, password: string): Promise<string | null> => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return token;
};