import express from 'express';
import admin from 'firebase-admin';
import _ from 'lodash';
import db from '../../database';
import asyncHandler from '../../helpers/asyncHandler';
import { Grid } from '../../models';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.get(
    '/getGrids',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const grids: Array<Grid> = await admin.firestore().runTransaction(async (tx) => {
            const user = await db.getUser(tx, res.locals.uid);

            return _.concat(user.current_games, user.old_games);
        });

        new SuccessResponse('user grids', grids).send(res);
    })
);

export default router;
