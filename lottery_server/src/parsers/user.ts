import admin from 'firebase-admin';
import _ from 'lodash';
import { User } from '../models';
import { DatabaseError } from '../core/apiError';

import DocumentSnapshot = admin.firestore.DocumentSnapshot;

export function parseUser(snap: DocumentSnapshot): User {
  if (!snap.exists) {
    throw new DatabaseError(`User not found at ${snap.ref.path}`);
  }

  const userDefault: User = {
    uid: snap.id,
    name: 'Unknown',
    normalized_name: 'unknown',
    avatar: 'https://bit.ly/broken-link',
    cash: 0,
    number_of_grids: 0,
    current_games: [],
    old_games: [],
  };

  return _.defaults(snap.data(), userDefault);
}
