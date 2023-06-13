import request from 'supertest';
import { app } from '../../../app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';

describe('Profile (e2e)', () => {

    beforeAll(async () => {
        await app.ready(); //o app estiver pronto ( terminou de ser inicializada - instalar o jwt ....)
    })

    afterAll(async() =>{
        await app.close(); //aguardar que minha aplicação feche
    })

    it('should be able to profile', async () => {
        const {token} = await createAndAuthenticateUser(app, true);

        //console.log(response);

        const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: 'gabriel@teste.com'
        })); // espero que a resposta venha um objeto e que tenha nesse objeto esse e-mail;
    })
})

//npm run test:e2es