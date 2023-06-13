import { InvalidCredentialsError } from '../../../services/errors/invalid-credentials-error';
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod';

import { makeAuthenticateUseCase } from '../../../services/factories/make-authenticate-use-case';


export async function authenticate( req: FastifyRequest, res: FastifyReply ){


    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });


    const { email, password } = authenticateBodySchema.parse(req.body);

    try {

        const authenticateService = makeAuthenticateUseCase();

        const { user } = await authenticateService.execute({  
            email, 
            password 
        });

        const token = await res.jwtSign({
            role: user.role,
        }, {
            sign: {
                sub: user.id
            },
        });

        const refreshToken = await res.jwtSign({
            role: user.role,
        }, {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            },
        });

        // Instalar o npm i @fastify/cookie
        return res.setCookie('refreshToken', refreshToken, {
            path: '/', //quais rotas vao ter acesso a esse cookie -> / é todos
            secure: true, //HTTPS
            sameSite: true, //no mesmo dominio site
            httpOnly: true, //acessado somente no backend e não no frontend
        }).status(200).send({
            token,
        });

    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            return res.status(400).send({ message: error.message });
        }

        throw error;
    }
}

//Teste e2e -> precisa bater com banco de dados