
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";

//Automatizar na criação de casos de uso (services);

export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new SearchGymsUseCase(gymsRepository) //enviar as dependencias do prisma como parametro

    return useCase;
}