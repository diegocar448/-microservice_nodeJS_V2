import { Router, Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';

const statusRoute = Router();

/* parâmetro com a tipagem e vai fazer a requisição*/
statusRoute.get('/status', (req: Request, res: Response, next:NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

export default statusRoute;