import express from 'express';
import admin from 'firebase-admin';
import types from 'typescript-is';
import db from '../../database';
import rules from '../../core/rules';
import { BadRequestError } from '../../core/apiError';
import { SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../helpers/asyncHandler';
import { LoginParams, User } from '../../models';

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!types.is<LoginParams>(req.body)) {
            throw new BadRequestError();
        }
        const params = types.assertType<LoginParams>(req.body);

        const normalizedName = rules.normalizeName(params.user.name);

        const user = await admin.firestore().runTransaction(async (tx) => {
            const userExists = await db.checkUserExists(tx, params.user.uid);

            if (userExists !== null) {
                // User already exists
                return userExists;
            }

            // Create user
            const payload = {
                ...params.user,
                normalized_name: normalizedName,
                cash: 100, // Set base cash
            };

            db.createUser(tx, { user: payload });
            return payload as User;
        });

        new SuccessResponse('Login success', user).send(res);
    })
);

export default router;
