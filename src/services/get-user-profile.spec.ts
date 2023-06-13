import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryUsersRepository } from './../repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { GetUserProfileUseCase } from './get-user-profile';


// unit Test - teste unitários - nunca vai tocar no banco de dados e nas camadas externas da nossa aplicação

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(userRepository);
    });

    it('should not be able to get user profile', async() => {

        const createdUser = await userRepository.create({
            name: 'Felipe Melo',
            email: 'felipe@email.com',
            password_hash: await hash('123456', 6),
        });

        const { user } = await sut.execute({
            userId: createdUser.id,
        });

        expect(user.id).toEqual(expect.any(String)); // Esperro que o id seja qualquer string
        expect(user.name).toEqual(expect.any(String));
    });

    it('should not be able to get user profile with wrong id', async() => {
        
        await expect(() => 
            sut.execute({
                userId: 'non-existing-id'
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    });
});