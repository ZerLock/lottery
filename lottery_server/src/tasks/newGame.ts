import admin from 'firebase-admin';
import db, { initDatabase } from "../database";
import { Game } from '../models';

export const newGameTask = async (): Promise<boolean> => {
    // Connect to db
    initDatabase();

    // create game
    const newGame: Partial<Game> = {
        name: 'Test game',
        grid: [0, 1, 3, 4, 5],
        users: [],
        total_cash: 0,
        created_at: admin.firestore.Timestamp.now(),
        played_at: admin.firestore.Timestamp.now(),
    };

    // TODO: some work
    await admin.firestore().runTransaction(async (tx) => {
        db.createGame(tx, newGame);
    });

    console.log('Game created');

    // Everything is good
    return true;
}
