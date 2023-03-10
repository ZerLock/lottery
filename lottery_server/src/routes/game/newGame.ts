import express from 'express';
import admin from 'firebase-admin';
import types from 'typescript-is';
import _ from 'lodash';
import db from '../../database';
import asyncHandler from '../../helpers/asyncHandler';
import { NewGridParams, Grid } from '../../models';
import { SuccessResponse } from '../../core/apiResponse';
import { BadRequestError, InternalError } from '../../core/apiError';

const router = express.Router();

router.post(
    '/new',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!types.is<NewGridParams>(req.body)) {
            throw new BadRequestError();
        }
        const params = types.assertType<NewGridParams>(req.body);

        const userId = res.locals.uid as string;
        const gameId = req.query.gameId as string;

        if (!gameId) {
            throw new BadRequestError(`game id not provided`);
        }

        const user = await admin.firestore().runTransaction(async (tx) => {
            const [user, game] = await Promise.all([
                db.getUser(tx, userId),
                db.getGame(tx, gameId),
            ]);

            // Check user cash
            const newCash = user.cash - game.play_cash;
            if (newCash < 0) {
                throw new InternalError(`Insufficient cash`);
            }
            user.cash = newCash;

            // Verify numbers (same or insufficient)
            if (params.numbers.length !== 5 || _.uniq(params.numbers).length !== 5) {
                throw new InternalError(`Invalid numbers`);
            }

            // Create new grid
            const newGrid: Grid = {
                id: (user.number_of_grids++).toString(),
                game_id: gameId,
                game_name: game.name,
                numbers: params.numbers,
            };

            user.current_games.push(newGrid); // Add new grid

            // Add user in game users
            if (!_.find(game.users, user.uid)) {
                game.users.push(user.uid);
                db.updateGame(tx, game.id, game);
            }

            db.updateUser(tx, user.uid, user);

            return user;
        });

        new SuccessResponse('New grid created', user).send(res);
    })
);

export default router;

