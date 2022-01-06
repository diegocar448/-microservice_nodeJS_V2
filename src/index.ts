import express, {Request, Response, NextFunction} from 'express';
import errorHandler from './middlewares/error-handle.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import authorizationRoute from './routes/authorization.route';

const app = express();

//Aqui tratamos retorno como JSON (Configurações da Aplicação)
app.use(express.json());
//Aqui faremos com que leia o retorno no formato queryString
app.use(express.urlencoded({ extended: true }));



//utilize essa configuração de users.route.ts (Configurações de Rotas)
app.use(usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);

//Configuração dos Handlers de Erro
app.use(errorHandler);

// Aqui definimos em qual porta será executada o nosso app (Inicialização do servidor)
app.listen(3000, () =>{
    console.log('Aplicação executando na porta 3000!');
});