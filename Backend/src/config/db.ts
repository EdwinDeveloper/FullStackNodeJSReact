import { AppDataSource } from './ormconfig';

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

export const connectDB = async () => {
    let retries = 0;
    
    while (retries < MAX_RETRIES) {
        try {
            await AppDataSource.initialize();
            console.log('Database connection established successfully');
            return;
        } catch (error) {
            retries += 1;
            console.error(`Error establishing database connection (attempt ${retries}):`, error);
            
            if (retries >= MAX_RETRIES) {
                console.error('Max retries reached. Exiting...');
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
        }
    }
};

