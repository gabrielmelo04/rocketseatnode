
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import { CreateGym } from "../create-gym";


//Automatizar na criação de casos de uso (services);

export function makeCreateGymUseCase(){
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CreateGym(gymsRepository) //enviar as dependencias do prisma como parametro

    return useCase;
}