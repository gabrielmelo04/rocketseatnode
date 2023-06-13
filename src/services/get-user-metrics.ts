//fetch -> mais que uma infoirmação
//get -> uma informação

import { CheckInsRepository } from '../repositories/check-in-repository';

interface GetUserMetricUseCaseRequest {
    userId: string,
}

interface GetUserMetricUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ userId }: GetUserMetricUseCaseRequest) : Promise<GetUserMetricUseCaseResponse>{

        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount,
        }
    }
}