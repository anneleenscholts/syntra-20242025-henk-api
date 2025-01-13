import { NextFunction, Request, Response, Router } from 'express';
import { getAllUsers, getUserById, deleteUserById } from '../services/UserService.js';
import { jwtMiddleware } from '../middleware/errorHandling.js';

export const initUserRoutes = (router: Router) => {
    /**
    * GET /users
    * @tags Users
    * @summary Get all users
    * @description Get all users that you have access to (to be defined what this means?)
    * @return {array<UserDTO>} 200 - Array of Users
    */
    router.get('/users', jwtMiddleware, getUsers);
    /**
    * GET /users/:id
    * @tags Users
    * @summary Get user by id
    * @description Get specific user if you have access to that user (to be defined what this means)
    * @param {string} id.query.required - The id of the user you want to fetch
    * @return {UserDTO} 200 - User object
    */
    router.get('/users/:id', jwtMiddleware, getUser);

    /**
    * DELETE /users/:id
    * @tags Users
    * @summary Delete a user by id
    * @description Delete a specific user if you have access to that user (to be defined what this means)
    * @param {string} id.query.required - The id of the user you want to delete
    * @return 200
    */
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
        res.status(200);
    } catch (error) {
        console.error('error', error);
        next(error);
    }
}