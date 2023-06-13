
import request from 'supertest';
import { app } from '../../../app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';
import { prisma } from '../../../lib/prisma';

describe('Validate Check-in (e2e)', () => {

    beforeAll(async () => {
        await app.ready(); //o app estiver pronto ( terminou de ser inicializada - instalar o jwt ....)
    })

    afterAll(async() =>{
        await app.close(); //aguardar que minha aplicação feche
    })

    it('should be able to validate a check-in', async () => {
        const {token} = await createAndAuthenticateUser(app, true);

        const user = await prisma.user.findFirstOrThrow();

        console.log(token);

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -23.707648,
                longitude: -45.4361088,
            },
        })

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id
            }
        })

        //console.log(response);

        const response = await request(app.server).patch(`/check-ins/${checkIn.id}/validate`).set('Authorization', `Bearer ${token}`).send()

        expect(response.statusCode).toEqual(204);
        
        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id,
            },
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date));
    })
})

//npm run test:e2es