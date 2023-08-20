import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

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
      password: String(process.env.DB_PASSWORD),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      // namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
