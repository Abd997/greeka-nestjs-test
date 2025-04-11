import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { TaskRepo } from './task.repo';
import { QueryTaskDto } from './dto/query-task.dto';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(private readonly taskRepo: TaskRepo) {}

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await this.taskRepo.create({ data });
    this.logger.log(`Created new task: ${task.uid}`);
    return task;
  }

  /**
   * Updates an existing task by UID.
   * Throws a NotFoundException if the task does not exist.
   */
  async updateTask(uid: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    const exists = await this.taskRepo.exists(uid);
    if (!exists)
      throw new NotFoundException(`Task: ${uid} to delete does not exists`);

    const task = await this.taskRepo.updateByUid(uid, data);
    this.logger.log(`Updated task: ${task.uid}`);
    return task;
  }

  /**
   * Deletes a task by UID.
   * Throws a NotFoundException if the task does not exist.
   */
  async deleteTask(uid: string) {
    const exists = await this.taskRepo.exists(uid);
    if (!exists)
      throw new NotFoundException(`Task: ${uid} to delete does not exists`);

    const task = await this.taskRepo.deleteByUid(uid);
    this.logger.log(`Deleted task: ${task.uid}`);
    return task;
  }

  /**
   * Retrieves a single task by UID.
   * Throws a NotFoundException if the task is not found.
   */
  async getTask(uid: string) {
    const task = await this.taskRepo.findByUid(uid);
    if (!task) throw new NotFoundException(`Task: ${uid} does not exists`);

    return task;
  }

  /**
   * Retrieves multiple tasks based on optional filter criteria.
   */
  async getTasks(dto: QueryTaskDto) {
    return this.taskRepo.findMany({
      take: dto.take,
      skip: dto.skip,
      where: {
        ...(dto.status && {
          status: {
            in: dto.status,
          },
        }),
        ...(dto.priority && {
          priority: {
            in: dto.priority,
          },
        }),
        ...(dto.uids && {
          uid: {
            in: dto.uids,
          },
        }),
        ...(dto.name && {
          name: {
            contains: dto.name,
          },
        }),
        ...(dto.isActive && {
          isActive: dto.isActive,
        }),
        ...(dto.dateDueBefore && {
          dateDue: {
            lt: dto.dateDueBefore,
          },
        }),
        ...(dto.dateDueAfter && {
          dateDue: {
            gt: dto.dateDueAfter,
          },
        }),
        ...(dto.dateCreatedBefore && {
          dateDue: {
            lt: dto.dateCreatedBefore,
          },
        }),
        ...(dto.dateCreatedAfter && {
          dateDue: {
            gt: dto.dateCreatedAfter,
          },
        }),
      },
    });
  }
}
