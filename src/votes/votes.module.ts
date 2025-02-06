import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VoteController } from './votes.controller';
import { VoteService } from './votes.service';
import { Vote } from './votes.entity';
import { VoteGateway } from './vote.gateway';
import { Player } from '../players/players.entity';
import { Room } from '../rooms/room.entity';

@Module({
  imports: [SequelizeModule.forFeature([Vote, Player, Room])],
  controllers: [VoteController],
  providers: [VoteService, VoteGateway],
  exports: [VoteService]
})
export class VoteModule {}