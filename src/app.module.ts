import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [TodoModule, PrismaModule, AppConfigModule],
})
export class AppModule {}
