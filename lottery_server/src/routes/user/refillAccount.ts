import express from 'express';
import admin from 'firebase-admin';
import types from 'typescript-is';
import _ from 'lodash';
import db from '../../database';
import asyncHandler from '../../helpers/asyncHandler';
import { RefillAccountParams } from '../../models';
import { BadRequestError } from '../../core/apiError';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.post(
    '/refillAccount',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!types.is<RefillAccountParams>(req.body)) {
            throw new BadRequestError();
        }
        const params = types.assertType<RefillAccountParams>(req.body);

        const user = await admin.firestore().runTransaction(async (tx) => {
            const user = await db.getUser(tx, res.locals.uid);

            user.cash += params.amount;

            db.updateUser(tx, user.uid, { cash: user.cash });
            return user;
        });

        new SuccessResponse(`Account refilled`, user).send(res);
    })
);

export default router;
