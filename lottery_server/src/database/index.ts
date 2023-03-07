import admin from 'firebase-admin';
import * as parser from '../parsers';
import { CONFIG, GLOBAL, USERS } from '../helpers/consts';
import { GlobalConfig, User } from '../models';

import DocumentReference = admin.firestore.DocumentReference;
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import Transaction = admin.firestore.Transaction;

const db = {
    // Getters
    getDoc: async function(path: string): Promise<any> {
        const ref: DocumentReference = admin.firestore().doc(path);
        const snap = await ref.get();

        return snap.exists ? snap.data() : null;
    },

    getGlobalConfig: async function(): Promise<GlobalConfig> {
        const snap: DocumentSnapshot = await admin.firestore().doc(`${CONFIG}/${GLOBAL}`).get();
        return parser.parseGlobalConfig(snap);
    },

    getUserByName: async function (tx: Transaction, normalizedName: User['normalized_name']): Promise<User | null> {
        const ref = admin.firestore().collection(`${USERS}`);
        const snap = await tx.get(ref.where('normalized_name', '==', normalizedName));

        if (snap.size <= 0) {
            // User does not exist
            return null;
        }
        return snap.docs[0].data() as User;
    },

    getUser: async function (tx: Transaction, userId: User['uid']): Promise<User> {
        const ref = admin.firestore().doc(`${USERS}/${userId}`);
        const snap = await tx.get(ref);
        return parser.parseUser(snap);
    },

    getUserNoTx: async function (userId: User['uid']): Promise<User | null> {
        const snap = await admin.firestore().doc(`${USERS}/${userId}`).get();
        return snap.exists ? parser.parseUser(snap) : null;
    },

    checkUserExists: async function (tx: Transaction, userId: User['uid']): Promise<User | null> {
        const ref = await admin.firestore().doc(`${USERS}/${userId}`);
        const snap = await tx.get(ref);
        return snap.exists ? snap.data() as User : null;
    },

    // Update
    updateGlobalConfig: function (tx: Transaction, data: Partial<GlobalConfig>): void {
        const ref: DocumentReference = admin.firestore().doc(`${GLOBAL}/${CONFIG}`);
        tx.update(ref, data);
    },

    // Create
    createUser: function (tx: Transaction, data: any): void {
        const ref = admin.firestore().doc(`${USERS}/${data.user.uid}`);
        tx.set(ref, data.user);
    },

    // Setters
    setDoc: async function (path: string, data: any): Promise<void> {
        const ref = admin.firestore().doc(path);
        await ref.set(data);
    },

    setGlobalConfig: function (tx: Transaction, data: Partial<GlobalConfig>): void {
        const ref: DocumentReference = admin.firestore().doc(`${GLOBAL}/${CONFIG}`);
        tx.set(ref, data);
    },

    // Delete
    deleteUser: async function (tx: Transaction, userId: User['uid']): Promise<void> {
        const ref: DocumentReference = admin.firestore().doc(`${USERS}/${userId}`);
        await tx.delete(ref);
    },
};

export default db;
