import express from 'express';
import logger from './logger';
import { environment } from '../config';
import {
    AuthFailureResponse,
    AccessTokenErrorResponse,
    InternalErrorResponse,
    NotFoundResponse,
    BadRequestResponse,
    ForbiddenResponse,
} from './apiResponse';

export enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    ACCESS_TOKEN = 'AccessTokenError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError',
    NO_ENTRY = 'NoEntryError',
    NO_DATA = 'NoDataError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForbiddenError',
    DATABASE = 'DatabaseError',
    BAD_DATA = 'BadDataError',
}

export abstract class ApiError extends Error {
    constructor(public type: ErrorType, public message: string = 'errror') {
        super(type);
    }

    public static handle(err: ApiError, res: express.Response): express.Response {
        // Record error response to logger
        logger.error(`[${res.req.method}] ${res.req.path} - ${err.message}`);
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.ACCESS_TOKEN:
                return new AccessTokenErrorResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
            case ErrorType.DATABASE:
                return new NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse(err.message).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse(err.message).send(res);
            default: {
                let message = err.message;
                // Do not send failure message in production as it may send sensitive data
                if (environment === 'production') message = 'Something wrong happened.';
                return new InternalErrorResponse(message).send(res);
            }
        }
    }
}

export class AuthFailureError extends ApiError {
    constructor(message = 'Invalid Credentials') {
        super(ErrorType.UNAUTHORIZED, message);
    }
}

export class DatabaseError extends ApiError {
    constructor(message = 'Database error') {
        super(ErrorType.DATABASE, message);
    }
}

export class BadDataError extends ApiError {
    constructor(message = 'Bad data error') {
        super(ErrorType.BAD_DATA, message);
    }
}

export class InternalError extends ApiError {
    constructor(message = 'Internal error') {
        super(ErrorType.INTERNAL, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.BAD_REQUEST, message);
    }
}

export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message = 'Permission denied') {
        super(ErrorType.FORBIDDEN, message);
    }
}

export class NoEntryError extends ApiError {
    constructor(message = "Entry don't exists") {
        super(ErrorType.NO_ENTRY, message);
    }
}

export class BadTokenError extends ApiError {
    constructor(message = 'Token is not valid') {
        super(ErrorType.BAD_TOKEN, message);
    }
}

export class TokenExpiredError extends ApiError {
    constructor(message = 'Token is expired') {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}

export class NoDataError extends ApiError {
    constructor(message = 'No data available') {
        super(ErrorType.NO_DATA, message);
    }
}

export class AccessTokenError extends ApiError {
    constructor(message = 'Invalid access token') {
        super(ErrorType.ACCESS_TOKEN, message);
    }
}
