import request from 'supertest';
import { app } from '../../../app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';
import { prisma } from '../../../lib/prisma';

describe('Create Check-in (e2e)', () => {

    beforeAll(async () => {
        await app.ready(); //o app estiver pronto ( terminou de ser inicializada - instalar o jwt ....)
    })

    afterAll(async() =>{
        await app.close(); //aguardar que minha aplicação feche
    })

    it('should be able to create a check-in', async () => {
        const {token} = await createAndAuthenticateUser(app);

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -23.707648,
                longitude: -45.4361088,
            },
        })

        //console.log(response);

        const profileResponse = await request(app.server).post(`/gyms/${gym.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
            latitude: -23.707648,
            longitude: -45.4361088,
        })

        expect(profileResponse.statusCode).toEqual(201);
    })
})

//npm run test:e2es