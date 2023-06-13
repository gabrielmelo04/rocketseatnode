import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms';



// unit Test - teste unitários - nunca vai tocar no banco de dados e nas camadas externas da nossa aplicação

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase


describe('Fetch Nearby Gyms Service - Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearByGymsUseCase(gymsRepository);

    });

    
    it('should be able to featch nearby gyms', async() => {

        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091
        });

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -27.0610928,
            longitude: -49.5229501
        });

        const { gyms } = await sut.execute({
            userLatitude: -27.2092052,
            userLongitude: -49.6401091
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Near Gym' }),
        ]);
    });
});