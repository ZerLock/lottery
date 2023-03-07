import logger from './core/logger';
import { port } from './config';
import app from './app';

app
    .listen(port, () => logger.info(`Server running on port : ${port}`))
    .on('error', (e) => logger.error(e));
