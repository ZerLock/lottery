import admin from 'firebase-admin';
import * as parser from '../parsers';
import { CONFIG, GAMES, GLOBAL, USERS } from '../helpers/consts';
import { GlobalConfig, User, Game } from '../models';

import serviceAccount from '../../res/lottery-server.json';

import DocumentReference = admin.firestore.DocumentReference;
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import Transaction = admin.firestore.Transaction;

export function initDatabase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
  admin.firestore().settings({
    ignoreUndefinedProperties: true,
  });
}

const db = {
  // Getters
  async getDoc(path: string): Promise<any> {
    const ref: DocumentReference = admin.firestore().doc(path);
    const snap = await ref.get();

    return snap.exists ? snap.data() : null;
  },

  async getGlobalConfig(): Promise<GlobalConfig> {
    const snap: DocumentSnapshot = await admin.firestore().doc(`${CONFIG}/${GLOBAL}`).get();
    return parser.parseGlobalConfig(snap);
  },

  async getUserByName(tx: Transaction, normalizedName: User['normalized_name']): Promise<User | null> {
    const ref = admin.firestore().collection(`${USERS}`);
    const snap = await tx.get(ref.where('normalized_name', '==', normalizedName));

    if (snap.size <= 0) {
      // User does not exist
      return null;
    }
    return snap.docs[0].data() as User;
  },

  async getUser(tx: Transaction, userId: User['uid']): Promise<User> {
    const ref = admin.firestore().doc(`${USERS}/${userId}`);
    const snap = await tx.get(ref);
    return parser.parseUser(snap);
  },

  async getUserNoTx(userId: User['uid']): Promise<User | null> {
    const snap = await admin.firestore().doc(`${USERS}/${userId}`).get();
    return snap.exists ? parser.parseUser(snap) : null;
  },

  async checkUserExists(tx: Transaction, userId: User['uid']): Promise<User | null> {
    const ref = await admin.firestore().doc(`${USERS}/${userId}`);
    const snap = await tx.get(ref);
    return snap.exists ? snap.data() as User : null;
  },

  async getGame(tx: Transaction, gameId: Game['id']): Promise<Game> {
    const ref = await admin.firestore().doc(`${GAMES}/${gameId}`);
    const snap = await tx.get(ref);
    return parser.parseGame(snap);
  },

  async getGames(tx: Transaction): Promise<Array<Game>> {
    const ref = await admin.firestore().collection(`${GAMES}`);
    const snap = await tx.get(ref);
    return parser.parseGames(snap);
  },

  // Update
  updateGlobalConfig(tx: Transaction, data: Partial<GlobalConfig>): void {
    const ref: DocumentReference = admin.firestore().doc(`${GLOBAL}/${CONFIG}`);
    tx.update(ref, data);
  },

  updateUser(tx: Transaction, userId: User['uid'], data: Partial<User>): void {
    const ref: DocumentReference = admin.firestore().doc(`${USERS}/${userId}`);
    tx.update(ref, data);
  },

  updateGame(tx: Transaction, gameId: Game['id'], data: Partial<Game>): void {
    const ref = admin.firestore().doc(`${GAMES}/${gameId}`);
    tx.update(ref, data);
  },

  // Create
  createUser(tx: Transaction, data: any): void {
    const ref = admin.firestore().doc(`${USERS}/${data.user.uid}`);
    tx.set(ref, data.user);
  },

  createGame(tx: Transaction, data: Partial<Game>): Game['id'] {
    const ref = admin.firestore().collection(`${GAMES}`).doc();
    tx.create(ref, data);

    return ref.id;
  },

  // Setters
  async setDoc(path: string, data: any): Promise<void> {
    const ref = admin.firestore().doc(path);
    await ref.set(data);
  },

  setGlobalConfig(tx: Transaction, data: Partial<GlobalConfig>): void {
    const ref: DocumentReference = admin.firestore().doc(`${GLOBAL}/${CONFIG}`);
    tx.set(ref, data);
  },

  // Delete
  async deleteUser(tx: Transaction, userId: User['uid']): Promise<void> {
    const ref: DocumentReference = admin.firestore().doc(`${USERS}/${userId}`);
    await tx.delete(ref);
  },
};

export default db;
