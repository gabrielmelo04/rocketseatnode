import { ValidateCheckInUseCase } from './../validate-check-in';
import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository";


//Automatizar na criação de casos de uso (services);

export function makeValidateCheckInUseCase(){
    const checkinsRepository = new PrismaCheckInsRepository
    const useCase = new ValidateCheckInUseCase(checkinsRepository) //enviar as dependencias do prisma como parametro

    return useCase;
}