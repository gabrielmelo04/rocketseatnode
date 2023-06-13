import request from 'supertest';
import { app } from '../../../app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';
import { prisma } from '../../../lib/prisma';

describe('Check-in History (e2e)', () => {

    beforeAll(async () => {
        await app.ready(); //o app estiver pronto ( terminou de ser inicializada - instalar o jwt ....)
    })

    afterAll(async() =>{
        await app.close(); //aguardar que minha aplicação feche
    })

    it('should be able to list the history of check-ins', async () => {
        const {token} = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -23.707648,
                longitude: -45.4361088,
            },
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
            ]
        })

        //console.log(response);

        const response = await request(app.server).get('/check-ins/history').set('Authorization', `Bearer ${token}`).send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            })
        ])
    })
})

//npm run test:e2es