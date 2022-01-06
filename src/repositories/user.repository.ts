import db from "../db";
import User from "../models/user.model";

class UserRepository {

    /* retornando uma lista [] de users */
    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, username
            FROM application_user
        `;
        //após pegar o resultado da consulta, apenas a propriedade { rows } da consulta
        const { rows } = await db.query<User>(query);        
        return rows || [];
    }

    async findById(uuid: string): Promise<User> {
        //não injetamos valor na SQL string para evitar SQL Injection
        const query = `
            SELECT uuid, username
            FROM application_user
            WHERE uuid = $1  
        `; 

        //aqui pegamo o nosso uuid
        const values = [uuid];

       //passando o uuid como parâmetro | após pegar o resultado da consulta, apenas a propriedade { rows } da consulta
        const { rows } = await db.query<User>(query, values);
        const [ user ] = rows;

        return user;
    }

    async create(user: User): Promise<string> { 
        const script = `
            INSERT INTO application_user (
                username, 
                password
            )                         
            VALUES ($1, crypt($2, 'my_salt'))
            RETURNING uuid
        `; 
        
        const values = [ user.username, user.password ];   

        const { rows } = await db.query<{ uuid: string }>(script, values);        
        const [newUser] = rows;        
        return newUser.uuid;
    }
}

export default new UserRepository();