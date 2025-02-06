import { Controller, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PlayerService } from './players.service';
import { CreatePlayerDto } from '../validator/playersDto';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  /**
   * O'yinchi yaratish
   */
  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  /**
   * O'yinchi ma'lumotlarini yangilash
   */
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<CreatePlayerDto>) {
    return this.playerService.update(id, updateData);
  }

  /**
   * O'yinchi xonaga qo'shish
   */
  @Post('join')
  async joinRoom(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.joinRoom(createPlayerDto);
  }

  /**
   * Ovoz berish
   */
  @Post('vote')
  async vote(@Body() voteData: { roomId: number; from: string; to: string }) {
    return this.playerService.vote(voteData.roomId, voteData.from, voteData.to);
  }

  /**
   * O'yinchini o'ldirish
   */
  @Post('kill')
  async killPlayer(@Body() killData: { roomId: number; playerName: string }) {
    return this.playerService.killPlayer(killData.roomId, killData.playerName);
  }

  /**
   * O'yinni tugatish
   */
  @Post('endGame')
  async endGame(@Body() endData: { roomId: number }) {
    return this.playerService.endGame(endData.roomId);
  }

  /**
   * Tirik o'yinchilar ro'yxatini olish
   */
//   @Get('alivePlayers/:roomId')
//   async getAlivePlayers(@Param('roomId') roomId: number) {
//     return this.playerService.getAlivePlayers(roomId);
//   }

  /**
   * O'yinchini xonadan chiqarish
   */
  @Delete('leave/:roomId/:username')
  async leaveRoom(@Param('roomId') roomId: number, @Param('username') username: string) {
    await this.playerService.leaveRoom(roomId, username);
    return { message: `Player ${username} left the room.` };
  }
}
