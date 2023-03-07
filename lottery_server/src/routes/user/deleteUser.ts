import express from 'express';
import admin from 'firebase-admin';
import db from '../../database';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

router.delete(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const userId = req.query.userId as string;

        if (!userId) {
            throw new BadRequestError(`No user id provided`);
        }

        await admin.firestore().runTransaction(async (tx) => {
            await db.deleteUser(tx, userId);
        });

        new SuccessResponse('User deleted', { uid: userId }).send(res);
    })
);

export default router;
