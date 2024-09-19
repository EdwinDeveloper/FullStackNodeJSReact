import { AppDataSource } from '../config/ormconfig';
import { Task } from '../entity/Task';

const taskRepository = AppDataSource.getRepository(Task);

export const getAllTasks = async (): Promise<Task[]> => {
    return await taskRepository.find();
};

export const getTaskById = async (id: string): Promise<Task | undefined> => {
    const task = await taskRepository.findOne({
        where: { id }
    });
    return task ?? undefined;
};

export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
    const task = taskRepository.create(taskData);
    return await taskRepository.save(task);
};
 
export const deleteOneTask = async (id: string): Promise<Task | undefined> => {
    const task = await taskRepository.findOne({
        where: { id }
    });
    if (!task) {
        throw new Error('User not found');
    }
    await taskRepository.remove(task);
    return task ?? undefined;
};

export const updateOneTask = async (taskId: string, updateData: Partial<Task>): Promise<Task> => {
    const task: Task | null = await taskRepository.findOneBy({ id: taskId });    
    if (!task) {
        throw new Error(`User with ID ${taskId} not found`);
    }
    taskRepository.merge(task, updateData);
    return await taskRepository.save(task);
};
