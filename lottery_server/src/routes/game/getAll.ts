import express from 'express';
import admin from 'firebase-admin';
import _ from 'lodash';
import db from '../../database';
import { Game } from '../../models';
import asyncHandler from '../../helpers/asyncHandler';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.get(
    '/getAll',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const games: Array<Game> = await admin.firestore().runTransaction(async (tx) => {
            return (await db.getGames(tx));
        });

        new SuccessResponse('Current games', { games }).send(res);
    })
);

export default router;
