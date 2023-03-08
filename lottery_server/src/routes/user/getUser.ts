import express from 'express';
import admin from 'firebase-admin';
import db from '../../database';
import asyncHandler from '../../helpers/asyncHandler';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const user = await admin.firestore().runTransaction(async (tx) => {
            const user = await db.getUser(tx, res.locals.uid as string);
            return user;
        });

        new SuccessResponse('User found', user).send(res);
    })
);

export default router;
