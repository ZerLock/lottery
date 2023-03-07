import admin from 'firebase-admin';
import { Grid, User } from '.';

export interface Game {
    readonly id: string;
    grid: Grid;
    users: Array<User['uid']>;
    total_cash: number;
    creation_date: admin.firestore.Timestamp;
}
