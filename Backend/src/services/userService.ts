import { AppDataSource } from '../config/ormconfig';
import { User } from '../entity/User';

export const getAllUsers = async (): Promise<User[]> => {
    return await AppDataSource.getRepository(User).find();
};

export const getUserById = async (id: string): Promise<User | undefined> => {
    const userRepository = AppDataSource.getRepository(User);
    
    const user = await userRepository.findOne({
        where: { id }
    });
    return user ?? undefined;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
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
