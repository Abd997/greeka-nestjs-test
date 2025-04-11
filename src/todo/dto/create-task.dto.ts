import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Name or title of the task',
    example: 'Finish documentation',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Current status of the task',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'Priority level of the task',
    enum: TaskPriority,
    example: TaskPriority.HIGH,
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({
    description: 'Due date of the task (ISO 8601 format)',
    example: '2025-05-01T17:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  dateDue: Date;

  @ApiProperty({
    description: 'Whether the task is currently active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;
}
