import request from 'supertest';
import { app } from '../../../app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';

describe('Search Gyms (e2e)', () => {

    beforeAll(async () => {
        await app.ready(); //o app estiver pronto ( terminou de ser inicializada - instalar o jwt ....)
    })

    afterAll(async() =>{
        await app.close(); //aguardar que minha aplicação feche
    })

    it('should be able search gyms by title', async () => {
        const {token} = await createAndAuthenticateUser(app, true);

        //console.log(response);

        await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'JavaScript Gym',
            description: 'Some description',
            phone: '1199999999',
            latitude: -23.707648,
            longitude: -45.4361088,
        })

        await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'TypeScript Gym',
            description: 'Some description',
            phone: '1199999999',
            latitude: -23.707648,
            longitude: -45.4361088,
        })

        const response = await request(app.server).get('/gyms/search')
        .query({
            query: 'JavaScript'
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            }),
        ])
    })
})

//npm run test:e2es