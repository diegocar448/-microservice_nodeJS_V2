import { Request, Response,  NextFunction} from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';


async function basicAuthenticationMiddleware(req:Request, res:Response, next: NextFunction){
    try {

        /* pegando o conteúdo do header authorization */
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas');
        }

        //basic myWSCxSk12PxI
        const [autheticationType, token] = authorizationHeader.split(' ');

        if(autheticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido');
        }

        //criamos um buffet de nosso token
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        //aqui fazemos um split para quebrar o conteúdo deixar cada parte uma variavel username e senha
        const [username, password] = tokenContent.split(':');

        //retornará um erro forbidden caso usuario ou senha não estiver preenchido
        if(!username || !password){
            throw new ForbiddenError('Credênciadas não preenchidas');
        }

        const user  = await userRepository.findUsernameAndPassword(username, password);

        if (!user) {
            throw new ForbiddenError('Usuário ou senha inválidos');
        }      
        
        //Com a requisição autenticada, colocamos o usuario dentro da requisição
        //Permite receber a propagação dessa requisição e ter acesso ao usuario
        req.user = user;
        //caso não tenha erro, se chegar o erro então erá para o middleware auth-authentication.middleware
        //ou vamos para o proximo handler ou vai para o error handler next(error)
        next();
        
    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;