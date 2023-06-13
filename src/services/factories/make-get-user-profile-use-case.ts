import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

//Automatizar na criação de casos de uso (services);

export function makeGetUserProfileUseCase(){
    const prismaUsersRepository = new PrismaUsersRepository();
    const useCase = new GetUserProfileUseCase(prismaUsersRepository); //enviar as dependencias do prisma como parametro

    return useCase;
}