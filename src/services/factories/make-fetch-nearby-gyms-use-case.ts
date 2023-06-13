
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import { FetchNearByGymsUseCase } from "../fetch-nearby-gyms";


//Automatizar na criação de casos de uso (services);

export function makeFetchNearByGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new FetchNearByGymsUseCase(gymsRepository) //enviar as dependencias do prisma como parametro

    return useCase;
}