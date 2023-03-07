import express from 'express';

type AsyncFunction = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => Promise<any>;

export default (execution: AsyncFunction) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  execution(req, res, next).catch(next);
};
