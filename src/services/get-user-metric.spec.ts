import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricUseCase } from './get-user-metrics';



// unit Test - teste unitários - nunca vai tocar no banco de dados e nas camadas externas da nossa aplicação

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricUseCase


describe('Get User Metric Service - Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMetricUseCase(checkInsRepository);

    });

    
    it('should be able to get check-ins count from metrics', async() => {

        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        });

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        });

        expect(checkInsCount).toEqual(2);
    });
});