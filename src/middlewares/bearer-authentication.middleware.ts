import { Request, Response, NextFunction } from 'express';
import { request } from 'http';
import ForbiddenError from '../models/errors/forbidden.error.model';
import JWT from 'jsonwebtoken';
import userRepository from '../repositories/user.repository';

//Authenticação baseada em um token


async function bearerAuthenticationMiddleware(req:Request, res:Response, next:NextFunction){
    try {
        
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credentiais não informadas');
        }

        const [ authorizationType, token ] = authorizationHeader.split(' ');

        if(authorizationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido');
        }
        
        const tokenPayload = JWT.verify(token,'my_secret_key');

        
        
        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {            
            throw new ForbiddenError('Token inválido');            
        }
        
        //const uuid = tokenPayload.sub.toString();
        //const user = await userRepository.findById(uuid);
        const user = {
            uuid: tokenPayload.sub.toString(),
            username: tokenPayload.username.toString(),
        };

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default bearerAuthenticationMiddleware;