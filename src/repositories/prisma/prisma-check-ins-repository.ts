import dayjs from "dayjs";
import { prisma } from "../../lib/prisma";
import { CheckInsRepository } from "../check-in-repository";
import { Prisma, CheckIn } from '@prisma/client';

export class PrismaCheckInsRepository implements CheckInsRepository{
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        });

        return checkIn;
    }
    async save(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id
            }, 
            data
        });

        return checkIn;
    }
    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id,
            }
        });

        return checkIn;
    }
    async findByUserIdOnDate(userId: string, date: Date){
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at:{
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        });

        return checkIn;
    }
    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where:{
                user_id: userId
            },
            take: 20, //é o limit (quantos itens quero trazer )
            skip: (page - 1) * 20 // ofset quantos itens quero pular -> page-1 começa do zero
        });

        return checkIns;
    }
    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({
            where: {
                user_id: userId
            }
        });

        return count;
    }
}