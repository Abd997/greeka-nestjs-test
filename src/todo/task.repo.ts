import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskRepo {
  constructor(private readonly prisma: PrismaService) {}

  async create(args: Prisma.TaskCreateArgs) {
    return this.prisma.task.create(args);
  }

  async update(args: Prisma.TaskUpdateArgs) {
    return this.prisma.task.update(args);
  }

  async updateByUid(uid: string, data: Prisma.TaskUpdateInput) {
    return this.update({ where: { uid }, data });
  }

  async delete(args: Prisma.TaskDeleteArgs) {
    return this.prisma.task.delete(args);
  }

  async deleteByUid(uid: string) {
    return this.delete({ where: { uid } });
  }

  async find(args: Prisma.TaskFindUniqueArgs) {
    return this.prisma.task.findUnique(args);
  }

  async findByUid(uid: string) {
    return this.find({ where: { uid } });
  }

  async findMany(args: Prisma.TaskFindManyArgs) {
    return this.prisma.task.findMany(args);
  }

  async exists(uid: string) {
    const exists = await this.prisma.task.count({ where: { uid }, take: 1 });
    return exists > 0;
  }
}
