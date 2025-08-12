import express from 'express';
import asyncHandler from 'express-async-handler';
import { userRegister, userLogin } from '../handlers/user'
import { validateJWT } from '../auth/validateJWT';

const router = express.Router();


router.post('/register', asyncHandler(userRegister));


router.post('/login', asyncHandler(userLogin));

export default router;