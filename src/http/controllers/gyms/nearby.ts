import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod';

import { makeFetchNearByGymsUseCase } from "../../../services/factories/make-fetch-nearby-gyms-use-case";


export async function nearby( req: FastifyRequest, res: FastifyReply ){

    const nearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    });

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query);

    const fetchNearbyGymsService = makeFetchNearByGymsUseCase();

    const { gyms } = await fetchNearbyGymsService.execute({ 
        userLatitude: latitude,
        userLongitude: longitude
    });

    return res.status(200).send({
        gyms
    });
}