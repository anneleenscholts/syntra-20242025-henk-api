import { NextFunction, Request, Response, Router } from 'express';
import { createGroup, deleteGroupById, getAllGroups, getGroupById } from '../services/GroupService.js';
import { jwtMiddleware } from '../middleware/errorHandling.js';

/**
 * A User
 * @typedef {object} Group
 * @property {string} name.required - Name
 */


export const initGroupRoutes = (router: Router) => {
    /**
    * GET /groups
    * @tags Groups
    * @summary Get all groups (you have access to)
    * @description Get all groups that you have access to (to be defined what this means)
    */
    router.get('/groups', jwtMiddleware, getGroups);
    /**
    * GET /groups/:id
    * @tags Groups
    * @summary Get a group
    * @description Get a group by group id
    * @param {string} id.query.required - The id of the group you want to fetch
    * @return {Group} 200 - Successful 
    */
    router.get('/groups/:id', jwtMiddleware, getGroup);
    router.delete('/groups/:id', jwtMiddleware, deleteGroup);
    router.post('/groups', jwtMiddleware, createNewGroup);
}

const getGroups = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    try {
        const groups = await getAllGroups();
        res.status(200).json(groups);
    } catch (error) {
        console.error('error', error);
        next(error);
    }
}

const getGroup = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    try {
        const user = await getGroupById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        console.error('error', error);
        next(error);
    }
}

const deleteGroup = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    try {
        await deleteGroupById(Number(req.params.id));
        res.status(200).json({});
    } catch (error) {
        console.error('error', error);
        next(error);
    }
}

const createNewGroup = async (req: Request, res: Response, next: NextFunction): Promise<void | undefined> => {
    const { name } = req.body;
    try {
        const group = await createGroup(name);
        res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
        console.error('error', error)
        next(error);
    } 
}