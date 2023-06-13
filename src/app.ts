import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

import { usersRoutes } from './http/controllers/users/routes';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { checkInsRoutes } from './http/controllers/check-ins/routes';

export const app = fastify();

//gerar um token secundário
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m', // 10minutos vai cehcar que esse usuário tem o refresh token para criar um novo JWT
    }
})

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, req, res) => {
    if(error instanceof ZodError){
        return res.status(400).send({ message: 'Validation error.', issues: error.format() });
    }

    if(env.NODE_ENV !== 'production'){
        console.error(error);
    }else{
        //TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return res.status(500).send({ message: 'Internal server error.' });
})

