import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './room.entity';
import { CreateRoomDto, UpdateRoomDto } from '../validator/roomDto';
import { Player } from 'src/players/players.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room)
    private roomModel: typeof Room,
        @InjectModel(Player)
        private playerModel: typeof Player,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomModel.create({...createRoomDto} as Room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.findAll();
  }

  async findOne(id: number){
    const room  = await this.roomModel.findByPk(id)
    if(!room){
        throw new NotAcceptableException(`room with id ${id} not found`);
    }
    return room
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomModel.findByPk(id);
    if (!room) {
      throw new Error('Room not found');
    }
    return room.update(updateRoomDto);
  }

  async remove(id: number): Promise<void> {
    const room = await this.roomModel.findByPk(id);
    if (!room) {
      throw new Error('Room not found');
    }
    await room.destroy();
  }


  async assignRoles(roomId: number) {
    // 1️⃣ Hona ichidagi barcha o‘yinchilarni olish
    const players = await this.playerModel.findAll({ where: { roomId } });
  
    const playerCount = players.length;
    if (playerCount < 5) throw new Error("O'yinni boshlash uchun kamida 5 ta o‘yinchi kerak!");
  
    // 2️⃣ Rollar sonini hisoblash
    const numMafias = Math.floor(playerCount / 5); // Har 5 kishiga 1 mafiya
    const numInspectors = Math.max(1, Math.floor(playerCount / 10)); // Har 10 kishiga 1 inspektor
    const numDoctors = Math.floor(playerCount / 10); // Har 10 kishiga 1 doktor
  
    // 3️⃣ Rollarni yaratish
    let roles = Array(numMafias).fill("mafia")
      .concat(Array(numInspectors).fill("inspektor"))
      .concat(Array(numDoctors).fill("doktor"))
      .concat(Array(playerCount - numMafias - numInspectors - numDoctors).fill("fuqaro"));
  
    // 4️⃣ Rollarni shuffle (tasodifiy aralashtiramiz)
    roles.sort(() => Math.random() - 0.5);
  
    // 5️⃣ O‘yinchilarga rollarni taqsimlash
    for (let i = 0; i < players.length; i++) {
      players[i].role = roles[i];
      await players[i].save();
    }
  
    return players;
  }

  async startGame(roomId: number) {
    const players = await this.assignRoles(roomId);
    return { message: "O'yin boshlandi!", players };
  }
  
  
}