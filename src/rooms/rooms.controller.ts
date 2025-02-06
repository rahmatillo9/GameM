import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto } from '../validator/roomDto';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Room> {
    return this.roomService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto): Promise<Room> {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.roomService.remove(id);
  }
}