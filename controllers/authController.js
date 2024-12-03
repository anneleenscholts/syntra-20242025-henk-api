import { registerUser, loginUser } from '../services/UserService.js';

export const initAuthRoutes = (router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
}

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await registerUser(username, email, password);
        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error('error', error)
        next(error);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error('error', error)
        next(error);
    }
};
