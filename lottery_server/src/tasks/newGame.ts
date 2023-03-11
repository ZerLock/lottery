import admin from 'firebase-admin';
import db, { initDatabase } from "../database";
import { Game } from '../models';

export const newGameTask = async (): Promise<void> => {
    console.log('Started creating new game');

    // Connect to db
    initDatabase();

    // create game
    const newGame: Partial<Game> = {
        name: 'Test game',
        grid: [10, 20, 13, 8, 1],
        users: [],
        total_cash: 19779,
        created_at: admin.firestore.Timestamp.now(),
        played_at: admin.firestore.Timestamp.now(),
    };

    // TODO: some work
    await admin.firestore().runTransaction(async (tx) => {
        db.createGame(tx, newGame);
    });

    console.log('Game created');
}

(async () => {
    await newGameTask();
});
