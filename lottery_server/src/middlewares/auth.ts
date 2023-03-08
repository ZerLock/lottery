import express from 'express';
import admin from 'firebase-admin';
import db from '../database';
import asyncHandler from '../helpers/asyncHandler';
import { ForbiddenError, NotFoundError } from '../core/apiError';

const router = express.Router();

router.use(
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        // Check if there is a token
        if (!token) {
            throw new ForbiddenError(`Authentication token not found`);
        }

        try {
            // Verify user token
            const decodedToken = await admin.auth().verifyIdToken(token);
            const userId = decodedToken.uid;

            // Check if the user already exists
            const user = db.getUserNoTx(userId);
            if (!user) {
                throw new NotFoundError(`User not found at id ${userId}`);
            }

            // Keep uid in response locals
            res.locals.uid = userId;
        } catch (err: any) {
            throw new ForbiddenError('Invalid provided token');
        }

        next();
    })
);

export default router;
