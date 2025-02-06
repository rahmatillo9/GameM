import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { VoteService } from './votes.service';
import { CreateVoteDto } from 'src/validator/votesDto';

@WebSocketGateway(3000)
export class VoteGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly voteService: VoteService) {}

  @SubscribeMessage('vote')
  async handleVote(@MessageBody() createVoteDto: CreateVoteDto) {
    const vote = await this.voteService.create(createVoteDto);
    this.server.emit('voteUpdate', vote);
  }
}