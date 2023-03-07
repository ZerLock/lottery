import admin from 'firebase-admin';
import types from 'typescript-is';
import logger from '../core/logger';
import { GlobalConfig } from '../models';
import { BadDataError, DatabaseError } from '../core/apiError';

import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import DocumentData = admin.firestore.DocumentData;

export function parseGlobalConfig(snap: DocumentSnapshot): GlobalConfig {
  if (!snap.exists) {
    throw new DatabaseError(`GlobalConfig not found at ${snap.ref.path}`);
  }

  const globalConfig: DocumentData | undefined = snap.data();

  if (!types.is<GlobalConfig>(globalConfig)) {
    logger.error(new BadDataError('GlobalConfig is badly formatted'));
  }

  return globalConfig as GlobalConfig;
}
