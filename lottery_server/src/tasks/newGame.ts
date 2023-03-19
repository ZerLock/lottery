import admin from 'firebase-admin';
import _ from 'lodash';
import db, { initDatabase } from "../database";
import logger from '../core/logger';
import { Game } from '../models';

const randomGrid = (): Array<number> => {
    // available numbers
    const tmp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let found = 0;
    const newNumbers: Array<number> = [];

    while (found < 5) {
        // Get random number
        const newNumber = _.sample(tmp);

        // If it exists
        if (newNumber) {
            found++;
            _.pull(tmp, newNumber);
            newNumbers.push(newNumber);
        }
    }
    return newNumbers;
}

// ts-node ./src/tasks/newGame.ts <offset days>
export const newGameTask = async (): Promise<void> => {
    logger.info('Started creating new game');

    // Connect to db
    initDatabase();

    // Offset day to add to played_at game
    const offsetDay = Number(process.argv[2]);

    // create game
    let newGame: Partial<Game> = {
        name: 'Game of ...',
        grid: randomGrid(),
        users: [],
        play_cash: 100,
        total_cash: 100000,
        created_at: admin.firestore.Timestamp.now(),
        played_at: admin.firestore.Timestamp.now(),
    };

    // Set new played_at date with offset
    const date = newGame.played_at?.toDate();
    if (date) {
        date?.setDate(date.getDate() + offsetDay);
        newGame.played_at = admin.firestore.Timestamp.fromDate(date);
    }

    // Set new game name
    if (newGame.name && newGame.played_at) {
        newGame.name = `Game of ${newGame.played_at.toDate().toDateString()}`;
    }

    // Create game
    await admin.firestore().runTransaction(async (tx) => {
        db.createGame(tx, newGame);
    });

    logger.info('New game created');
}

async function main() {
    await newGameTask();
}

main();
