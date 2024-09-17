import { Router } from 'express';
import { createUserController, getUsers, getUser, deleteUser, updateUser } from '../controllers/userController'

const router = Router();

router.get('/all', getUsers);
router.get('/:id', getUser);
router.post('/create', createUserController);
router.patch('/update', updateUser)
router.delete('/:id', deleteUser);

export default router;
