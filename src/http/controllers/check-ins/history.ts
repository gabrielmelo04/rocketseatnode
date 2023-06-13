import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod';

import { makeFetchUserCheckInsHistoryUseCase } from "../../../services/factories/make-fetch-user-chek-ins-history-use-case";


export async function history( req: FastifyRequest, res: FastifyReply ){

    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1), //coerce.number converte string para number, no mínimo 1 pagina caso n tiver o default ( começa ) com a pagina 1
        
    });

    const { page } = checkInHistoryQuerySchema.parse(req.query);

    const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryUseCase();

    const { checkIns } = await fetchUserCheckInsHistoryService.execute({ 
        userId: req.user.sub,
        page,
    });

    return res.status(200).send({
        checkIns,
    });
}