import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod';

import { makeValidateCheckInUseCase } from "../../../services/factories/make-valideta-chek-in-use-case";

export async function validate( req: FastifyRequest, res: FastifyReply ){

    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })

    const { checkInId } = validateCheckInParamsSchema.parse(req.params);

    const validateCheckInService =  makeValidateCheckInUseCase();

    await validateCheckInService.execute({ 
        checkInId,
    });

    return res.status(204).send();
}