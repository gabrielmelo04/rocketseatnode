import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryUsersRepository } from './../repositories/in-memory/in-memory-users-repository';
//import { PrismaUsersRepository } from './../repositories/prisma/prisma-users-repository';

import { RegisterService } from './register';

// unit Test - teste unitários - nunca vai tocar no banco de dados e nas camadas externas da nossa aplicação

//recriando essas variaveis na memoria
let userRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service - Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new RegisterService(userRepository);
    });

    it('should be able to register', async() => {
        //const prismaUsersRepository = new PrismaUsersRepository;
        //const registerService = new RegisterService(prismaUsersRepository);

        const { user } = await sut.execute({
            name: 'Mikarla Firma',
            email: 'mikarla@email.com',
            password: '123456',
        });

        expect(user.id).toEqual(expect.any(String)); // Esperro que o id seja qualquer string
    });

    it('should hash user password upon registration', async() => {
        //const prismaUsersRepository = new PrismaUsersRepository;
        //const registerService = new RegisterService(prismaUsersRepository);

        const { user } = await sut.execute({
            name: 'Felipe Silva',
            email: 'felipe@email.com',
            password: '123456',
        });
        console.log(user.password_hash);

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async() => {

        const email = 'felipe@email.com';

        await sut.execute({
            name: 'Felipe Silva',
            email,
            password: '123456',
        });

        //Resolve | Reject
        // Toda vez que tenho um expect com uma Promise, preciso colocar await na frente do expect
        await expect(() => sut.execute({
            name: 'Felipe Silva',
            email,
            password: '123456',
        }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError); // Eu espero que ela rejeite e que o erro vindo desse retorno seja uma instancia da classe UserAlreadyExistserror
        
    });
});