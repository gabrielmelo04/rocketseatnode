
import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

//Automatizar na criação de casos de uso (services);

export function makeFetchUserCheckInsHistoryUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository
    const useCase = new FetchUserCheckInsHistoryUseCase(checkinsRepository) //enviar as dependencias do prisma como parametro

    return useCase;
}