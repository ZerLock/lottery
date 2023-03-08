import express from 'express';
import authMiddleware from '../middlewares/auth';
import auth from './auth';
import getUser from './user/getUser';
import deleteUser from './user/deleteUser';
import updateUser from './user/updateUser';

const router = express.Router();

/**
 * Authentication
 */
router.use('/auth', auth);

/**
 * Authentication middleware
 */
router.use(authMiddleware);

/**
 * User
 */
router.use('/user', getUser);
router.use('/user', deleteUser);
router.use('/user', updateUser);

/**
 * Game
 */
// router.use('/game', getGames)

export default router;
