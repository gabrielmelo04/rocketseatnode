import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { authenticate } from "./authenticate.controller";
import { register } from "./register.controller";
import { profile } from "./profile";
import { refresh } from "./refresh";


export async function usersRoutes(app:FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);

    app.patch('/token/refresh', refresh);

    // Rotas Autenticadas
    app.get('/me', { onRequest: [verifyJWT] }, profile);
}