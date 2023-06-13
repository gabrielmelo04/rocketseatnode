import 'dotenv/config';

import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';
import { Environment } from 'vitest';
import { PrismaClient } from '@prisma/client';

//"postgresql://docker:docker@localhost:5432/apisolid?schema=public"

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string){
    if(!process.env.DATABASE_URL){
        throw new Error('Please provide a DATABASE_URL environment variable');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schema);

    return url.toString();
}

export default <Environment> {
    name: 'prisma',
    async setup(){
        const schema = randomUUID();
        const databaseURL = generateDatabaseURL(schema);

        //console.log(generateDatabaseURL(schema));

        process.env.DATABASE_URL = databaseURL;

        execSync('npx prisma migrate deploy'); //vou usar o deploy em vez de dev

        return {
            async teardown() {
                //apagar o banco de dados criado
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`); //CASCADE ->tudo que depende dessa tabela tambem vai ser apagado

                await prisma.$disconnect();
            }, //metodo depois dos testes executarem ( para cada arquivo de teste )
        }
    } //executar antes dos testes
}