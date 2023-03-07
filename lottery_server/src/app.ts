import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import logger from './core/logger';
import { environment } from './config';
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType,
} from './core/apiError';
import routes from './routes';
import serviceAccount from '../res/lottery-server.json';

process.on('uncaughtException', (e) => {
    logger.error(e);
});

// Initialize Firestore
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
});
admin.firestore().settings({
    ignoreUndefinedProperties: true,
});

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(cors());

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
        if (err.type === ErrorType.INTERNAL) {
            logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
    } else {
        logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        logger.error(err);
        if (environment == 'development') {
            return res.status(500).send(err);
        }
        ApiError.handle(new InternalError(), res);
    }
});

export default app;
