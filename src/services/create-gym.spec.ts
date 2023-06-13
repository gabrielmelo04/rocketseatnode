import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';

import { CreateGym } from './create-gym';


//recriando essas variaveis na memoria
let gymsRepository: InMemoryGymsRepository
let sut: CreateGym

describe('Register Service - Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGym(gymsRepository);
    });

    it('should be able to register', async() => {

        const { gym } = await sut.execute({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -23.707648,
            longitude: -45.4361088,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});