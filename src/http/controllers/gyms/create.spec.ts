import request from 'supertest';
import { app } from '../../../app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';

describe('Create Gym (e2e)', () => {

    beforeAll(async () => {
        await app.ready(); //o app estiver pronto ( terminou de ser inicializada - instalar o jwt ....)
    })

    afterAll(async() =>{
        await app.close(); //aguardar que minha aplicação feche
    })

    it('should be able to create a gym', async () => {
        const {token} = await createAndAuthenticateUser(app, true);

        //console.log(response);

        const profileResponse = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'JavaScript Gym',
            description: 'Some description',
            phone: '1199999999',
            latitude: -23.707648,
            longitude: -45.4361088,
        })

        expect(profileResponse.statusCode).toEqual(201);
    })
})

//npm run test:e2es