import { NextFunction, Request, Response, Router } from 'express';
import { getAllUsers, getUserById, deleteUserById } from '../services/UserService.js';
import { jwtMiddleware } from '../middleware/errorHandling.js';

export const initUserRoutes = (router: Router) => {
    router.get('/users', jwtMiddleware, getUsers);
    router.get('/users/:id', jwtMiddleware, getUser);
    router.delete('/users/:id', jwtMiddleware, deleteUser);
    // router.patch('users/:id', editUser);
}

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('error', error);
        next(error);
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    try {
        const user = await getUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        console.error('error', error);
        next(error);
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    try {
        const success = await deleteUserById(Number(req.params.id));
        res.status(200).json({});
    } catch (error) {
        console.error('error', error);
        next(error);
    }
}