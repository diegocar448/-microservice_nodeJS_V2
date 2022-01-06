import { Router, Request, Response,  NextFunction} from 'express';
import StatusCodes from 'http-status-codes';
import userRepository from '../repositories/user.repository';
import DatabaseError from '../models/errors/database.error.mode';

//configuração de rota
const usersRoute = Router();


// get/users
usersRoute.get('/users', async (req:Request, res:Response, next:NextFunction) => {
    //Aqui chamamos o metodo em repository que fará a consulta no BD e retornará os dados
    const users = await userRepository.findAllUsers();

    // aqui passamos o StatusCodes  usando o repositorio (npm install --save 'http-status-code')
    res.status(StatusCodes.OK).send( users );
});

// get /:uuid
// podemos tbm tipar o parâmetro em Request com o Request<{ uuid:string }>
usersRoute.get('/users/:uuid', async (req:Request<{ uuid: string }>, res:Response, next:NextFunction) => {
    try {
        //aqui pegar o valor passado na url
        const uuid = req.params.uuid;

        const user = await userRepository.findById(uuid);
        res.status(StatusCodes.OK).send( user );
    } catch (error) {        
        next(error)
    }
    
});



// post /users
// caso envie os dados em um formato diferente JSON a requisição retornará um json vazio {}
usersRoute.post('/users', async (req:Request, res:Response, next:NextFunction) => {
    const newUser = req.body; 
         
    const uuid = await userRepository.create(newUser);    
    res.status(StatusCodes.CREATED).send(uuid);
});


// put /users/:uuid
usersRoute.put('/users/:uuid', async (req:Request<{ uuid: string }>, res:Response, next:NextFunction) => { 

    try {
        const uuid = req.params.uuid;
        const modifiedUser = req.body;

        //atribuir mais o uuid para o response
        modifiedUser.uuid = uuid;

        await userRepository.update(modifiedUser);

        res.status(StatusCodes.OK).send();
        
    } catch (error) {
        
    }
    
});

// delete /users/:uuid
usersRoute.delete('/users/:uuid', async (req:Request<{ uuid: string }>, res:Response, next:NextFunction) => {

    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    
    res.sendStatus(StatusCodes.OK);
});




export default usersRoute;




