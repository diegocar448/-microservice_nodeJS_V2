import { Request, Response,  NextFunction} from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.mode';

function errorHandler(error: any, req:Request, res:Response, next:NextFunction){
    if(error instanceof DatabaseError){
        res.status(StatusCodes.BAD_REQUEST);
    }else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }    
}

export default errorHandler;