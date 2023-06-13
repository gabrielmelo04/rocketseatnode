import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-in-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

//Em cima do InMemoryRepository -> ctrl + .
export class InMemoryCheckInsRepository implements CheckInsRepository {

    public items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) {
        const satrtOfTheDay = dayjs(date).startOf('date'); //2023-02-28T:15:30   -> Vai retornar 2023-02-28T00:00:00 ( inicio do dia)
        const endOfTheDay = dayjs(date).endOf('date');

        const checkInonSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at);

            //Verificar se a data está entre o começo e o fim do dia;
            const isOnSameDate = checkInDate.isAfter(satrtOfTheDay) && checkInDate.isBefore(endOfTheDay);

            return checkIn.user_id === userId && isOnSameDate
        }
        )

        if(!checkInonSameDate){
            return null
        }

        return checkInonSameDate;
    }

    async findById(id: string) {
        const checkIn = this.items.find((item) => item.id === id )

        if(!checkIn){
            return null;
        }

        return checkIn;
    }

    async findManyByUserId(userId: string, page: number) {
        return this.items.filter(item => item.user_id === userId)
                .slice((page - 1) * 20, page * 20) //passar os indices que eu quero
    }

    async countByUserId(userId: string): Promise<number> {
        return this.items.filter(item => item.user_id === userId)
                .length
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn);

        return checkIn;
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        if(checkInIndex >= 0){
            this.items[checkInIndex] = checkIn; // atualizar
        }

        return checkIn
    }

}
