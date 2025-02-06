import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vote } from './votes.entity';
import { CreateVoteDto, UpdateVoteDto } from '../validator/votesDto';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote)
    private voteModel: typeof Vote,
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    return this.voteModel.create({...createVoteDto} as Vote);
  }

  async findAll(): Promise<Vote[]> {
    return this.voteModel.findAll({ include: ['voter', 'voted', 'room'] });
  }

  async findOne(id: number) {
      const vote  = await this.voteModel.findByPk(id)
        if(!vote){
            throw new NotAcceptableException(`room with id ${id} not found`);
        }
    return vote
  }

  async update(id: number, updateVoteDto: UpdateVoteDto): Promise<Vote> {
    const vote = await this.voteModel.findByPk(id);
    if (!vote) {
      throw new Error('Vote not found');
    }
    return vote.update(updateVoteDto);
  }

  async remove(id: number): Promise<void> {
    const vote = await this.voteModel.findByPk(id);
    if (!vote) {
      throw new Error('Vote not found');
    }
    await vote.destroy();
  }
}