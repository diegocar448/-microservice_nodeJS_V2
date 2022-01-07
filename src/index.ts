import express, {Request, Response, NextFunction} from 'express';
import errorHandler from './middlewares/error-handle.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import authorizationRoute from './routes/authorization.route';
import basicAuthenticationMiddleware from './middlewares/basic-authentication.middleware';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';

const app = express();


//A ordem de como são listados os app.use são importantes quando usamos o express/nodeJS

//Aqui tratamos retorno como JSON (Configurações da Aplicação)
app.use(express.json());
//Aqui faremos com que leia o retorno no formato queryString
app.use(express.urlencoded({ extended: true }));



//utilize essa configuração de users.route.ts (Configurações de Rotas)
//para todos os end-points de usersRoute vão precisar antes estar autênticados com o Bearer token
//app.use(jwtAuthenticationMiddleware, usersRoute);



app.use(statusRoute);
app.use(authorizationRoute);
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

//Configuração dos Handlers de Erro
app.use(errorHandler);

// Aqui definimos em qual porta será executada o nosso app (Inicialização do servidor)
app.listen(3000, () =>{
    console.log('Aplicação executando na porta 3000!');
});