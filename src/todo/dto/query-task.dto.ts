import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '@prisma/client';
import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryTaskDto {
  @ApiPropertyOptional({
    description: 'Number of records to take',
    example: 20,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  take = 20;

  @ApiPropertyOptional({
    description: 'Number of records to take',
    example: 0,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  skip = 0;

  @ApiPropertyOptional({
    description: 'Number of records to skip',
    enum: TaskStatus,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(TaskStatus, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  status?: TaskStatus[];

  @ApiPropertyOptional({
    description: 'Filter tasks by priority',
    enum: TaskPriority,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(TaskPriority, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  priority?: TaskPriority[];

  @ApiPropertyOptional({
    description: 'Filter tasks by uids',
    isArray: true,
    type: String,
    example: ['25dc56c6-d324-455f-b79c-5b055b8edc10'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  uids?: string[];

  @ApiPropertyOptional({
    description: 'Filter tasks by name',
    type: String,
    example: 'task',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter tasks if active or not',
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Only return tasks due before this date',
    type: String,
    format: 'date-time',
    example: '2025-05-01T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDateBefore?: Date;

  @ApiPropertyOptional({
    description: 'Only return tasks due after this date',
    type: String,
    format: 'date-time',
    example: '2025-04-01T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDateAfter?: Date;
}
