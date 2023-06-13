import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

//Automatizar na criação de casos de uso (services);

export function makeAuthenticateUseCase(){
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateUseCase(prismaUsersRepository); //enviar as dependencias do prisma como parametro

    return authenticateService;
}