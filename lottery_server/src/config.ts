import config from '../res/firebase-config.json';

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 8080;
export const firebaseConfig = config;
