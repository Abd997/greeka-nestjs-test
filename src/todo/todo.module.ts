import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TaskRepo } from './task.repo';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TaskRepo],
})
export class TodoModule {}
