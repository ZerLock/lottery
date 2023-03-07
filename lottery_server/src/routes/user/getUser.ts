import express from 'express';
import admin from 'firebase-admin';
import db from '../../database';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const userId = req.query.userId as string;

        if (!userId) {
            throw new BadRequestError(`No user id provided`);
        }

        const user = await admin.firestore().runTransaction(async (tx) => {
            const user = await db.getUser(tx, userId);
            return user;
        });

        new SuccessResponse('User found', user).send(res);
    })
);

export default router;
