import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TodoService } from './todo.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';

@Controller('task')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTask(@Body() dto: CreateTaskDto) {
    return this.todoService.createTask(dto);
  }

  @Put(':uid')
  async updateTask(@Param('uid') uid: string, @Body() dto: UpdateTaskDto) {
    return this.todoService.updateTask(uid, dto);
  }

  @Delete(':uid')
  async deleteTask(@Param('uid') uid: string) {
    return this.todoService.deleteTask(uid);
  }

  @Get(':uid')
  async getTask(@Param('uid') uid: string) {
    return this.todoService.getTask(uid);
  }

  @Get()
  async getTasks(@Query() dto: QueryTaskDto) {
    return this.todoService.getTasks(dto);
  }
}
