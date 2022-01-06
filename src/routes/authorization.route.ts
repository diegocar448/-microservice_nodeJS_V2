import { Router, Request, Response,  NextFunction} from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';


const authorizationRoute = Router();

authorizationRoute.post('/token', (req:Request, res:Response, next:NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas');
        }

        //basic myWSCxSk12PxI
        const [autheticationType, token] = authorizationHeader.split(' ');

        if(autheticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

    } catch (error) {
        next(error);
    }


    
});


export default authorizationRoute;