import express from 'express';
import admin from 'firebase-admin';
import types from 'typescript-is';
import _ from 'lodash';
import db from '../../database';
import rules from '../../core/rules';
import asyncHandler from '../../helpers/asyncHandler';
import { UpdateUserParams, User } from '../../models';
import { SuccessResponse } from '../../core/apiResponse';
import { BadRequestError } from '../../core/apiError';

const router = express.Router();

router.put(
    '/',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!types.is<UpdateUserParams>(req.body)) {
            throw new BadRequestError();
        }
        const params = types.assertType<UpdateUserParams>(req.body);

        const newUser = await admin.firestore().runTransaction(async (tx) => {
            const user = await db.getUser(tx, res.locals.uid);

            // New user
            const tmp: Partial<User> = {};

            // Check name
            if (params.name) {
                if (user.name !== params.name) {
                    tmp['name'] = params.name;
                    tmp['normalized_name'] = rules.normalizeName(params.name);
                }
            }

            // Update user in database
            await db.updateUser(tx, user.uid, newUser);
            return _.defaults(user, newUser);
        });

        new SuccessResponse('User updated', newUser).send(res);
    })
);

export default router;
