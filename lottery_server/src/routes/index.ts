import express from 'express';

// Middlewares
import authMiddleware from '../middlewares/auth';

// Controllers
import auth from './auth';
import getUser from './user/getUser';
import deleteUser from './user/deleteUser';
import updateUser from './user/updateUser';
import getUserGrids from './user/getGrids';
import refillAccount from './user/refillAccount';
import getGames from './game/getAll';
import newGame from './game/newGame';
import claimGrid from './game/claimGrid';

// Routes path
import { authRoute, gameRoute, userRoute } from '../helpers/consts';

const router = express.Router();

/**
 * Authentication
 */
router.use(authRoute, auth);

/**
 * Authentication middleware
 */
router.use(authMiddleware);

/**
 * User
 */
router.use(userRoute, getUser);
router.use(userRoute, deleteUser);
router.use(userRoute, updateUser);
router.use(userRoute, getUserGrids);
router.use(userRoute, refillAccount);

/**
 * Game
 */
router.use(gameRoute, getGames);
router.use(gameRoute, newGame);
router.use(gameRoute, claimGrid);

export default router;
