import { Request, Response } from 'express';
import { getAllUsers, getUserById, createUser, deleteOneUser, updateOneUser } from '../services/userService';
import { User } from '../models/General'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await getUserById(String(req.params.id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};

export const createUserController = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;
        const newUser = await createUser(user);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userDelete = await deleteOneUser(String(req.params.id));
        res.status(204).json(userDelete);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try{
        const newData: User = req.body
        const user: User = await updateOneUser(newData.id, newData);
        res.status(201).json(user)
    }catch(error: any){
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}