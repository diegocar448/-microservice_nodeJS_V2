import { Router, Request, Response,  NextFunction, response } from 'express';
import StatusCodes from 'http-status-codes';

//configuração de rota
const usersRoute = Router();


// get/users
usersRoute.get('/users', (req:Request, res:Response, next:NextFunction) => {
    const users = [{ userName: 'Diego' }];
    // aqui passamos o StatusCodes  usando o repositorio (npm install --save 'http-status-code')
    res.status(StatusCodes.OK).send( users );
});

// get /:uuid
// podemos tbm tipar o parâmetro em Request com o Request<{ uuid:string }>
usersRoute.get('/users/:uuid', (req:Request<{ uuid: string }>, res:Response, next:NextFunction) => {

    //aqui pegar o valor passado na url
    const uuid = req.params.uuid;    
    res.status(StatusCodes.OK).send({ uuid });
});



// post /users
// caso envie os dados em um formato diferente JSON a requisição retornará um json vazio {}
usersRoute.post('/users', (req:Request, res:Response, next:NextFunction) => {    
    const newUser = req.body;    
    res.status(StatusCodes.CREATED).send(newUser);
});


// put /users/:uuid
usersRoute.put('/users/:uuid', (req:Request<{ uuid: string }>, res:Response, next:NextFunction) => { 
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    //atribuir mais o uuid para o response
    modifiedUser.uuid = uuid;

    res.status(StatusCodes.OK).send({ modifiedUser });
});

// delete /users/:uuid
usersRoute.delete('/users/:uuid', (req:Request<{ uuid: string }>, res:Response, next:NextFunction) => {
    const uuid = req.params.uuid;
    res.sendStatus(StatusCodes.OK);
});




export default usersRoute;




