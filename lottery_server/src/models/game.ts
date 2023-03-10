import admin from 'firebase-admin';
import { User } from '.';

// Displayed cash on frontend is 90% of total_cash (10% -> globalConfig.total_cash)
export interface Game {
    readonly id: string;
    name: string;
    grid: Array<number>;
    users: Array<User['uid']>;
    play_cash: number;
    total_cash: number;
    created_at: admin.firestore.Timestamp;
    played_at: admin.firestore.Timestamp;
}
