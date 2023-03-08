import express from 'express';
import cors from 'cors';
import { initDatabase } from './database';
import logger from './core/logger';
import { environment } from './config';
import {
    NotFoundError,
    ApiError,
    InternalError,
    ErrorType,
} from './core/apiError';
import routes from './routes';

// Catch uncaught exception
process.on('uncaughtException', (e) => {
    logger.error(e);
});

// Initialize Firestore
initDatabase();

// Create express app
const app = express();

// Setup request body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

// Enable CORS
app.use(cors());

// All routes
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
