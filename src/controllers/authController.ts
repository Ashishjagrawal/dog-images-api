import { NextFunction, Request, Response } from 'express';
import { register, login } from '../services/authService';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await register(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.status(200).json({ token });
    } catch (err: any) {
        if (err?.message === 'User not found') return res.status(404).json({ error: err.message })
        return res.status(400).json({ error: err });
    }
};