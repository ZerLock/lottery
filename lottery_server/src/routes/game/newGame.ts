import express from 'express';
import admin from 'firebase-admin';
import types from 'typescript-is';
import _ from 'lodash';
import db from '../../database';
import asyncHandler from '../../helpers/asyncHandler';
import { NewGridParams, Grid, Game } from '../../models';
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

        await admin.firestore().runTransaction(async (tx) => {
            const [user, game] = await Promise.all([
                db.getUser(tx, userId),
                db.getGame(tx, gameId),
            ]);

            // Check if the game is available yet (played_at > Date.now())
            if (game.played_at.toMillis() <= Date.now()) {
                throw new InternalError(`Cannot play on this games. The registrations are closed`);
            }

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

            // Check value of numbers (min: 0 and max: 20)
            for (const num of params.numbers) {
                if (num > 20 || num < 0) {
                    throw new InternalError(`Invalid number: ${num}`);
                }
            }

            const partialGame: Partial<Game> = {
                id: game.id,
                name: game.name,
                grid: game.grid,
                total_cash: game.total_cash,
                played_at: game.played_at,
            };

            // Create new grid
            const newGrid: Grid = {
                id: (user.number_of_grids++).toString(),
                game: partialGame,
                claimed_cash: null,
                title: '',
                numbers: params.numbers,
            };

            user.current_games.push(newGrid); // Add new grid

            // Add user in game users
            if (!game.users.includes(user.uid)) {
                game.users.push(user.uid);
                db.updateGame(tx, game.id, game);
            }

            db.updateUser(tx, user.uid, user);
        });

        new SuccessResponse('New grid created', {}).send(res);
    })
);

export default router;

