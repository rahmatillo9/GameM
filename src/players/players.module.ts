import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlayerController } from './players.controller';
import { PlayerService } from './players.service';
import { Player } from './players.entity';
import { PlayerGateway } from './players.getway';
import { Room } from 'src/rooms/room.entity';

@Module({
  imports: [SequelizeModule.forFeature([Player, Room])],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerGateway],
  exports: [PlayerService]
})
export class PlayerModule {}