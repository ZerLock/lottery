import express from 'express';
import admin from 'firebase-admin';
import _ from 'lodash';
import { BadRequestError } from '../../core/apiError';
import { SuccessResponse } from '../../core/apiResponse';
import db from '../../database';
import asyncHandler from '../../helpers/asyncHandler';

const router = express.Router();

router.post(
    '/claim',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const gridId = req.query.gridId as string;

        if (!gridId) {
            throw new BadRequestError(`No grid id provided`);
        }

        const price = await admin.firestore().runTransaction(async (tx) => {
            const user = await db.getUser(tx, res.locals.uid);
            const grid = _.find(user.old_games, { id: gridId });

            console.log(grid);

            return 0;
        });

        new SuccessResponse(`Game prices claimed`, { price }).send(res);
    })
);

export default router;
