import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from "dotenv";
import { PlayerModule } from './players/players.module';
import { RoomModule } from './rooms/rooms.module';
import { VoteModule } from './votes/votes.module';
dotenv.config();
@Module({
  imports: [
  PlayerModule,
    RoomModule,
    VoteModule,
   SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,

      // pool: {
      //   max: 10, // Eng ko‘p 10 ta ulanish
      //   min: 2,  // Eng kamida 2 ta ulanish
      //   acquire: 30000, // 30s ichida ulana olmasa, timeout
      //   idle: 10000, // 10s harakatsiz bo‘lsa, ulanish yopiladi
      // },
    }),


  ],

})
export class AppModule {}


  