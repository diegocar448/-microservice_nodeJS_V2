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

    /* deixamos a Promise como void pois não retornará nada após a inserção */
    async update(user: User): Promise<void> { 
        const script = `
            UPDATE application_user SET
                username = $1, 
                password = crypt($2, 'my_salt')
            WHERE uuid = $3
        `; 
        
        const values = [ user.username, user.password, user.uuid ];   

        await db.query(script, values);
    }

    async remove(uuid: string): Promise<void> { 
        const script = `
            DELETE FROM 
            application_user
            WHERE uuid = $1
        `; 
        
        const values = [ uuid ];   

        await db.query(script, values);
    }
}

export default new UserRepository();