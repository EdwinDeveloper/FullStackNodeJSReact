import { AppDataSource } from '../config/ormconfig';
import { User } from '../entity/User';
import { Task } from '../entity/Task';
import { classToPlain } from 'class-transformer';

export const getAllUsers = async (): Promise<User[]> => {
    return await AppDataSource.getRepository(User).find({
        relations: ["tasks"],
    });
};

export const getUserById = async (id: string): Promise<User | undefined> => {
    const userRepository = AppDataSource.getRepository(User);
    
    const user = await userRepository.findOne({
        where: { id },
        relations: ["tasks"]
    });
    return user ?? undefined;
};

export const createUser = async (userData: Partial<User>): Promise<any> => {
    const userRepository = AppDataSource.getRepository(User);
    const taskRepository = AppDataSource.getRepository(Task);

    const user = userRepository.create(userData);
    const savedUser = await userRepository.save(user);

    if (userData.tasks && userData.tasks.length > 0) {
        const tasks = userData.tasks.map(task => {
            const newTask = taskRepository.create(task);
            newTask.assignedToId = savedUser;
            return newTask;
        });
        
        await taskRepository.save(tasks);
        savedUser.tasks = tasks;
    }
    const userWithoutTasks = { ...savedUser, tasks: undefined };
    return userWithoutTasks;
};

 
export const deleteOneUser = async (id: string): Promise<User | undefined> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: { id }
    });
    if (!user) {
        throw new Error('User not found');
    }
    await userRepository.remove(user);
    return user ?? undefined;
};

export const updateOneUser = async (userId: string, updateData: Partial<User>): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const user: User | null = await userRepository.findOneBy({ id: userId });    
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }
    userRepository.merge(user, updateData);
    return await userRepository.save(user);
};
