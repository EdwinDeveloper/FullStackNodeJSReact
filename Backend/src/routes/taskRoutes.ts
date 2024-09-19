import { Router } from 'express';
import { createTaskController, getTasks, getTask, deleteTask, updateTask } from '../controllers/taskController'

const router = Router();

router.get('/all', getTasks);
router.get('/:id', getTask);
router.post('/create', createTaskController);
router.patch('/update', updateTask)
router.delete('/:id', deleteTask);

export default router;
