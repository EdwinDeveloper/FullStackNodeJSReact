import { Request, Response } from 'express';
import { getAllTasks, getTaskById, createTask, deleteOneTask, updateOneTask } from '../services/taskService';
import {} from '../services/userService'
import { Task } from '../models/General'

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

export const getTask = async (req: Request, res: Response) => {
    try {
        const task = await getTaskById(String(req.params.id));
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task' });
    }
};

export const createTaskController = async (req: Request, res: Response) => {
    try {
        const task: Task = req.body;
        const newTask = await createTask(task);
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskDelete = await deleteOneTask(String(req.params.id));
        res.status(204).json(taskDelete);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try{
        const newData: Task = req.body
        const task: Task = await updateOneTask(newData.id, newData);
        res.status(201).json(task)
    }catch(error: any){
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
}