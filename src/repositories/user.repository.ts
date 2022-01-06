import db from "../db";
import User from "../models/user.model";

class UserRepository {

    /* retornando uma lista [] de users */
    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, username
            FROM application_user
        `;
        //após pegar o resultado da consulta, vai adicionar na variavel
        const result = await db.query<User>(query);
        const rows = result.rows;
        return rows || [];
    }
}

export default new UserRepository();