import admin from 'firebase-admin';
import _ from 'lodash';
import db, { initDatabase } from '../database';
import rules from '../core/rules';
import { Grid } from '../models';

export const execGamesTask = async (): Promise<void> => {
    console.log('Started executing games');

    // Connect to db
    initDatabase();

    await admin.firestore().runTransaction(async (tx) => {
        const games = await db.getGames(tx);

        games.map(async (game) => {
            // If the game is finished
            if (game.played_at.toMillis() < Date.now()) {
                game.users.map(async (userId) => {
                    // Get user
                    const user = await db.getUser(tx, userId);

                    const userGrids: Array<Grid> = _.filter(user.current_games, { game_id: game.id });
                    for (const grid of userGrids) {
                        const price = rules.getPriceMultiplier(game.grid, grid.numbers);

                        // Give price to user
                        user.cash += game.total_cash * price;

                        // Remove grid from current grids
                        _.pull(user.current_games, grid);

                        // Add grid to the old grids
                        user.old_games.push(grid);
                    }
                });
                db.deleteGame(tx, game.id);
            }
        });
    });

    console.log('Games executed');
}

(async () => {
    await execGamesTask();
});
