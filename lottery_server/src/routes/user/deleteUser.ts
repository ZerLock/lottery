import express from 'express';
import admin from 'firebase-admin';
import db from '../../database';
import asyncHandler from '../../helpers/asyncHandler';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.delete(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const userId = res.locals.uid as string;

        await admin.firestore().runTransaction(async (tx) => {
            await db.deleteUser(tx, userId);
        });

        new SuccessResponse('User deleted', { uid: userId }).send(res);
    })
);

export default router;
