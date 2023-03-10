import admin from 'firebase-admin';
import _ from 'lodash';
import { Game } from '../models';
import { DatabaseError } from '../core/apiError';

import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import QuerySnapshot = admin.firestore.QuerySnapshot;

export function parseGame(snap: DocumentSnapshot): Game {
    if (!snap.exists) {
        throw new DatabaseError(`Game not found at ${snap.ref.path}`);
    }

    const gameDefault: Game = {
        id: snap.id,
        name: 'Unknown',
        grid: [],
        users: [],
        play_cash: 0,
        total_cash: 0,
        created_at: admin.firestore.Timestamp.now(),
        played_at: admin.firestore.Timestamp.now(),
    };

    return _.defaults(snap.data(), gameDefault);
}

export function parseGames(query: QuerySnapshot): Array<Game> {
    return query.docs.map((doc) => parseGame(doc));
}
