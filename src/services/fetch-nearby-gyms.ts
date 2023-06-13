import { Gym } from '@prisma/client';
import { GymsRepository } from "../repositories/gyms-repository";

interface FetchNearByGymsUseCaseRequest {
    userLatitude: number,
    userLongitude: number
}

interface FetchNearByGymsUseCaseUseCaseResponse {
    gyms: Gym[]
}

export class FetchNearByGymsUseCase {

    constructor( private gymsRepository: GymsRepository){}

    async execute({ userLatitude, userLongitude }:FetchNearByGymsUseCaseRequest):Promise<FetchNearByGymsUseCaseUseCaseResponse>{
    
        const gyms = await this.gymsRepository.findManyNearBy({
           latitude: userLatitude,
           longitude: userLongitude 
        })

        return {
            gyms,
        }
    }
}