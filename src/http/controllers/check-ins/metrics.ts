import { FastifyRequest, FastifyReply } from "fastify";

import { makeGetUserMatricsUseCase } from "../../../services/factories/make-get-user-matrics-use-case";


export async function metrics( req: FastifyRequest, res: FastifyReply ){

    const getUserMetricsService = makeGetUserMatricsUseCase();

    const { checkInsCount } = await getUserMetricsService.execute({ 
        userId: req.user.sub,
    });

    return res.status(200).send({
        checkInsCount,
    });
}