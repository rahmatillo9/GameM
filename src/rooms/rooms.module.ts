import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomController } from './rooms.controller';
import { RoomService } from './rooms.service';
import { Room } from './room.entity';
import { RoomGateway } from './room.getway';
import { Vote } from 'src/votes/votes.entity';
import { Player } from 'src/players/players.entity';
import { PlayerService } from 'src/players/players.service';
import { VoteModule } from 'src/votes/votes.module';
import { VoteService } from 'src/votes/votes.service';

@Module({
  imports: [VoteModule, SequelizeModule.forFeature([Room, Vote, Player])],
  controllers: [RoomController],
  providers: [RoomService, RoomGateway, PlayerService, VoteService],
  exports: [RoomService]
})
export class RoomModule {}