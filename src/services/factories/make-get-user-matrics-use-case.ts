
import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricUseCase } from "../get-user-metrics";

//Automatizar na criação de casos de uso (services);

export function makeGetUserMatricsUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository
    const useCase = new GetUserMetricUseCase(checkinsRepository) //enviar as dependencias do prisma como parametro

    return useCase;
}