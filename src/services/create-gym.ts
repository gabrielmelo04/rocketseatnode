import { Gym } from '@prisma/client';
import { GymsRepository } from "../repositories/gyms-repository";

interface CreateGymRequest {
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGym {

    constructor( private gymsRepository: GymsRepository){}

    async execute({ title, description, phone, latitude, longitude }:CreateGymRequest):Promise<CreateGymUseCaseResponse>{
    
        const gym = await this.gymsRepository.create({
            
            title,
            description,
            phone,
            latitude,
            longitude
            
        });

        return {
            gym,
        }
    }
}