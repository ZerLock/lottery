import * as env from 'env-var';

export const SERVER_URL = env.get('REACT_APP_SERVER_URL').required().asString();
