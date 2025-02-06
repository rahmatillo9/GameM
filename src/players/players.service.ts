import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Player } from './players.entity';
import { CreatePlayerDto } from '../validator/playersDto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player)
    private playerModel: typeof Player,
  ) {}

  /**
   * O'yinchi yaratish
   */
  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerModel.create({ ...createPlayerDto } as Player);
  }

  /**
   * O'yinchi ma'lumotlarini yangilash
   */
  async update(id: number, updateData: Partial<Player>): Promise<Player> {
    const player = await this.playerModel.findByPk(id);
    if (!player) {
      throw new Error('Player not found');
    }
    return player.update(updateData);
  }

  /**
   * O'yinchini xonaga qo'shish
   */
  async joinRoom(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.create(createPlayerDto);
  }

  /**
   * Ovoz berish
   */
  async vote(roomId: number, from: string, to: string): Promise<any> {
    const voter = await this.playerModel.findOne({ where: { name: from, roomId } });
    const voted = await this.playerModel.findOne({ where: { name: to, roomId } });

    if (!voter || !voted) {
      throw new Error('Player not found');
    }

    // Bu yerda ovozlarni ovozlar jadvaliga qo'shish lozim (agar mavjud bo'lsa)
    return { voter, voted };
  }

  /**
   * O'yinchini o'ldirish
   */
  async killPlayer(roomId: number, playerName: string): Promise<Player> {
    const player = await this.playerModel.findOne({ where: { name: playerName, roomId } });
    if (!player) {
      throw new Error('Player not found');
    }
    player.status = 'dead'; // O'yinchi holatini "o'lik" deb belgilash
    return player.save();
  }

  /**
   * O'yinni tugatish
   */
  async endGame(roomId: number): Promise<any> {
    const players = await this.playerModel.findAll({ where: { roomId } });

    return {
      message: 'O‘yin tugadi!',
      result: players.map(player => ({
        name: player.name,
        role: player.role,
        status: player.status,
      })),
    };
  }

  

  /**
   * Tirik o'yinchilar ro'yxatini olish
   */
  async getAlivePlayers(roomId: number): Promise<Player[]> {
    return this.playerModel.findAll({ where: { roomId, status: 'alive' } });
  }

  /**
   * O'yinchini xonadan chiqarish
   */
  async leaveRoom(roomId: number, username: string): Promise<void> {
    const player = await this.playerModel.findOne({ where: { roomId, name: username } });
  
    if (!player) {
      throw new Error('Player not found in this room.');
    }
  
    // O'yinchini ma'lumotlar bazasidan o'chirish
    await player.destroy();
  }
}
