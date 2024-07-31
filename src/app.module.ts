import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables based on the NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV
    ? `${process.cwd()}/.env.${process.env.NODE_ENV}`
    : `${process.cwd()}/.env`,
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: false,
      // namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
