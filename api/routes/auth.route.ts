import express from 'express';
import { register, login, logout } from '../controllers/auth.controller';

const router = express.Router();

// @ts-ignore
router.post('/register', register);

// @ts-ignore
router.post('/login', login);

// @ts-ignore
router.post('/logout', logout);

export default router;
