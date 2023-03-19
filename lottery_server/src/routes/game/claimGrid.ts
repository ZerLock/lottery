import express from 'express';
import admin from 'firebase-admin';
import _ from 'lodash';
import db from '../../database';
import rules from '../../core/rules';
import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError, InternalError, NotFoundError } from '../../core/apiError';
import { SuccessResponse } from '../../core/apiResponse';

const router = express.Router();

router.post(
    '/claim',
    asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const gridId = req.query.gridId as string;

        if (!gridId) {
            throw new BadRequestError(`No grid id provided`);
        }

        const [prize, title] = await admin.firestore().runTransaction(async (tx) => {
            const user = await db.getUser(tx, res.locals.uid);
            const grid = _.find(user.current_games, { id: gridId, claimed_cash: null });

            if (!grid) {
                throw new NotFoundError(`Grid ${gridId} does not exists or is already claimed`);
            }

            if (grid.game.played_at.toMillis() > Date.now()) {
                throw new InternalError(`Cannot claim prize, game not finished`);
            }

            // Calculate prize from the grid
            const [prizeMultiplier, title] = rules.getPrizeMultiplier(grid.game.grid, grid.numbers);
            const prize = _.ceil(grid.game.total_cash * prizeMultiplier);

            // Give prize to user
            user.cash += prize;

            // Remove grid from current grids
            _.pull(user.current_games, grid);

            // Update grid and add claimed_cash value and title
            grid.claimed_cash = prize;
            grid.title = title;

            // Add grid to old grids
            user.old_games.push(grid);

            // Update user
            db.updateUser(tx, user.uid, user);

            return [prize, title];
        });

        new SuccessResponse(`Game prizes claimed`, { prize, title }).send(res);
    })
);

export default router;
