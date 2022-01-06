/* Para usar o postgres precisamos habilitar uma extensão uuid_generate_v4*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
/* Aqui habilitamos a extensão crypt */
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)

/* my_salt seria o tipo de criptografia exemplo podemos adicionar uma criptografia de verdade*/
INSERT INTO application_user (username, password) VALUES ('diego', crypt('admin', 'my_salt'));