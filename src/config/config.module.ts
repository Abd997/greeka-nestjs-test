import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      ignoreEnvFile: false,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('test', 'local', 'dev', 'prod')
          .default('local'),
      }),
    }),
  ],
})
export class AppConfigModule {}
