import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod';

import { makeSearchGymsUseCase } from '../../../services/factories/make-search-gyms-use-case';


export async function search( req: FastifyRequest, res: FastifyReply ){

    const searchGymsQuerySchemaSchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1), //coerce.number converte string para number, no mínimo 1 pagina caso n tiver o default ( começa ) com a pagina 1
        
    });

    const { query, page } = searchGymsQuerySchemaSchema.parse(req.query);

    const searchGymsService = makeSearchGymsUseCase();

    const { gyms } = await searchGymsService.execute({ 
        query,
        page
    });

    return res.status(200).send({
        gyms,
    });
}