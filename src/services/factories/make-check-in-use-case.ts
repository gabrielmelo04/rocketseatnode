import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../checkin";

//Automatizar na criação de casos de uso (services);

export function makeCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository) //enviar as dependencias do prisma como parametro

    return useCase;

}