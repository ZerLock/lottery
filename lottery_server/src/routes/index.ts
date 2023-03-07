import express from 'express';
import auth from './auth';
import getUser from './user/getUser';
import deleteUser from './user/deleteUser';

const router = express.Router();

/**
 * Authentication
 */
router.use('/auth', auth);

/**
 * User
 */
// router.use('/user', userMiddleware);
router.use('/user', getUser);
router.use('/user', deleteUser);

export default router;
