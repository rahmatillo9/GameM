import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VoteService } from './votes.service';
import { CreateVoteDto, UpdateVoteDto } from '../validator/votesDto';
import { Vote } from './votes.entity';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async create(@Body() createVoteDto: CreateVoteDto): Promise<Vote> {
    return this.voteService.create(createVoteDto);
  }

  @Get()
  async findAll(): Promise<Vote[]> {
    return this.voteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Vote> {
    return this.voteService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateVoteDto: UpdateVoteDto): Promise<Vote> {
    return this.voteService.update(id, updateVoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.voteService.remove(id);
  }
}