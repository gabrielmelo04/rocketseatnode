import request from 'supertest';
import { app } from '../../../app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Refresh Token (e2e)', () => {

    beforeAll(async () => {
        await app.ready(); //o app estiver pronto ( terminou de ser inicializada - instalar o jwt ....)
    })

    afterAll(async() =>{
        await app.close(); //aguardar que minha aplicação feche
    })

    it('should be able to refresh a token', async () => {
        await request(app.server).post('/users').send({
            name: 'Gabriel Melo',
            email: 'gabriel@teste.com',
            password: '1234567'
        })

        const authResponse = await request(app.server).post('/sessions').send({
            email: 'gabriel@teste.com',
            password: '1234567'
        });

        const cookies = authResponse.get('Set-Cookie');

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies)
            .send()

        //console.log(response);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String),
        }) // espero que venha um token

        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})

//npm run test:e2es