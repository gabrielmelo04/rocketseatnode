import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
    
    await prisma.user.create({
        data: {
            name: 'Gabriel Melo',
            email: 'gabriel@teste.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER',
        }
    })

    /*//Cira o usuário
    await request(app.server).post('/users').send({
        name: 'Gabriel Melo',
        email: 'gabriel@teste.com',
        password: '1234567',
        role: isAdmin ? 'ADMIN' : 'MEMBER'
    })*/

    //Faço o Login
    const authResponse = await request(app.server).post('/sessions').send({
        email: 'gabriel@teste.com',
        password: '123456'
    })

    const {token} = authResponse.body;

    return {
        token,
    }
}