import { NextFunction, Request, Response, Router } from 'express';
import { registerUser, loginUser } from '../services/UserService.js';

export const initAuthRoutes = (router: Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
}

const register = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    const { username, email, password } = req.body;
    try {
        const user = await registerUser(username, email, password);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error('error', error)
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    const { email, password } = req.body;
    try {
        const { token, returnUser: user } = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        console.error('error', error)
        next(error);
    }
};
