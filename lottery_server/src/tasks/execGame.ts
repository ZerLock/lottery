import admin from 'firebase-admin';
import db, { initDatabase } from '../database';
import logger from '../core/logger';

export const execGameTask = async (): Promise<void> => {
    logger.info('Started executing game');

    // Connext to db
    initDatabase();

    await admin.firestore().runTransaction(async (tx) => {
        const games = await db.getGames(tx);
        await games.map(async (game) => {
            if (game.played_at.toMillis() < Date.now()) {
                await db.deleteGame(tx, game.id);
                logger.info(`Game ${game.id} deleted`);
            }
        });
    });

    logger.info('Game executed');
};

async function main() {
    await execGameTask();
}

main();
