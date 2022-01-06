// Esse arquivo será responsavel pela conexão do BD


import { Pool } from 'pg';

const connectionString = 'postgres://bsokrjnk:UGifYFktoqBekxYxsv_An02OWoS_PbPI@motty.db.elephantsql.com/bsokrjnk';

const db = new Pool({ connectionString });

export default db;