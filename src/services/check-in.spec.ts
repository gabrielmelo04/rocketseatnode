import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';

import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './checkin';
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';



// unit Test - teste unitários - nunca vai tocar no banco de dados e nas camadas externas da nossa aplicação

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase


describe('Check-in Service - Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-23.5997855),
            longitude: new Decimal(-45.3903503)
        })

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });
    
    it('should be able to check-in', async() => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.5997855,
            userLongitude: -45.3903503,
        });

        console.log(checkIn.created_at);

        expect(checkIn.id).toEqual(expect.any(String)); // Espero que o id seja qualquer string
    });

    // red -> erro no teste
    // green -> faço aquilo funcionar
    // refactor -> eu refatoro
    // Trabalhar com datas com vites -> mocking

    it('should not be able to check-in in twice in the same day', async() => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.5997855,
            userLongitude: -45.3903503,
        });

        await expect (() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.5997855,
            userLongitude: -45.3903503,
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)

    });

    it('should be able to check-in in twice but in different days', async() => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.5997855,
            userLongitude: -45.3903503,
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.5997855,
            userLongitude: -45.3903503,
        })

        expect(checkIn.id).toEqual(expect.any(String));

    });

    it('should not be able to check in on distant gym', async() => {

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-23.5997855),
            longitude: new Decimal(-45.3903503)
        });

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -23.707648,
            userLongitude: -45.4361088,
        })
        ).rejects.toBeInstanceOf(MaxDistanceError); // estou esperando que de um erro
    });
});