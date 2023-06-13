import { FastifyRequest, FastifyReply } from "fastify";

export async function refresh( req: FastifyRequest, res: FastifyReply ){

    await req.jwtVerify({ onlyCookie: true });

        const { role } = req.user;

        const token = await res.jwtSign({
            role
        }, {
            sign: {
                sub: req.user.sub
            },
        });

        const refreshToken = await res.jwtSign({ role }, {
            sign: {
                sub: req.user.sub,
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
}

//Teste e2e -> precisa bater com banco de dados