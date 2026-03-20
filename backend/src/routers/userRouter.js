import express from 'express';
import { getUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUser)
router.post('/', registerUser);

export default router;