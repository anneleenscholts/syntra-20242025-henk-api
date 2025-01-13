import { NextFunction, Request, Response, Router } from 'express';
import { registerUser, loginUser } from '../services/UserService.js';

/**
 * Register response
 * @typedef {object} RegisterResponse
 * @property {string} message - Status message
 * @property {UserDTO} user - Registered user
 */

/**
 * Login response
 * @typedef {object} LoginResponse
 * @property {string} message - Status message
 * @property {string} token - Access token
 */

export const initAuthRoutes = (router: Router) => {
    /**
    * POST /auth/register
    * @tags Authentication and authorization
    * @summary Register a new user
    * @description Register a new user to use the application. When a user is created, there is also a default group created.
    * @param {RegisterUser} request.body.required - User info
    * @return {RegisterResponse} 201 - Successful registration
    */
    router.post('/auth/register', register);

    /**
    * POST /auth/login
    * @tags Authentication and authorization
    * @summary Login and get access token
    * @description Exchange user credentials for an access token to use the api
    * @param {User} request.body.required - User credentials
    * @return {LoginResponse} 200 - Successful login
    */
    router.post('/auth/login', login);
}

const register = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    const { username, email, password, firstName, lastName, defaultLanguage } = req.body;
    try {
        const user = await registerUser(username, email, password, firstName ?? '', lastName ?? '', defaultLanguage ?? null);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error('error', error)
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error('error', error)
        next(error);
    }
};
