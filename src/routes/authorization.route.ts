import { Router, Request, Response,  NextFunction} from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';


const authorizationRoute = Router();

/* aqui deixamos esse middleware de token apenas para rota token */
authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req:Request, res:Response, next:NextFunction) => {

        // "iss" O domínio da aplicação geradora do token
        // "sub" É o assunto do token, mas é muito utilizado para guarda o ID do usuário
        // "aud" Define quem pode usar o token
        // "exp" Data para expiração do token
        // "nbf" Define uma data para qual o token não pode ser aceito antes dela
        // "iat" Data de criação do token
        // "jti" O id do token


    try {
        const user = req.user;

        //Caso não encontre o user entrará aqui
        if (!user) {
            throw new ForbiddenError('Usuario não informado');
        }
        
        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secret_key';

        //vamos criar um token aqui
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({ token:jwt });        

    } catch (error) {
        next(error);
    }


    
});


export default authorizationRoute;