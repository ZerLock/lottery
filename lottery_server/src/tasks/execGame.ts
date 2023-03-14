import admin from 'firebase-admin';
import db, { initDatabase } from '../database';

export const execGameTask = async (): Promise<void> => {
    console.log('Started executing game');

    // Connect to db
    initDatabase();

    await admin.firestore().runTransaction(async (tx) => {
        const games = await db.getGames(tx);
        await games.map(async (game) => {
            if (game.played_at.toMillis() < Date.now()) {
                await db.deleteGame(tx, game.id);
                console.log(`Game ${game.id} deleted`);
            }
        });
    });

    console.log('Game executed');
}

async function main() {
    await execGameTask();
}

main();
