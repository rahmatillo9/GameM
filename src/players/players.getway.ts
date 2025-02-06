import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PlayerService } from './players.service';
import { CreatePlayerDto } from 'src/validator/playersDto';

@WebSocketGateway(3000)
export class PlayerGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly playerService: PlayerService) {}

  @SubscribeMessage('joinRoom')
async handleJoinRoom(@MessageBody() data: CreatePlayerDto) {
  const player = await this.playerService.joinRoom(data);
  this.server.to(`room_${data.roomId}`).emit('playerJoined', player);
}


  @SubscribeMessage('createPlayer')
  async handleCreatePlayer(@MessageBody() createPlayerDto: CreatePlayerDto) {
    const player = await this.playerService.create(createPlayerDto);
    this.server.emit('playerCreated', player);
  }

  @SubscribeMessage('updatePlayerStatus')
  async handleUpdatePlayerStatus(@MessageBody() data: { id: number, status: string }) {
    const { id, status } = data;
    const player = await this.playerService.update(id, { status });
    this.server.emit('playerStatusUpdated', player);
  }



  @SubscribeMessage('votePlayer')
  async handleVote(@MessageBody() data: { roomId: number, from: string, to: string }) {
    const voteResult = await this.playerService.vote(data.roomId, data.from, data.to);
    this.server.to(`room_${data.roomId}`).emit('playerVoted', voteResult);
  
    // Agar ovoz berish tugasa (masalan, barcha ovoz bergan bo‘lsa), natijani chiqarish
    if (voteResult.isVotingComplete) {
      this.server.to(`room_${data.roomId}`).emit('voteResult', voteResult.finalResult);
    }
  }
  

  @SubscribeMessage('killPlayer')
  async handleKill(@MessageBody() data: { roomId: number, playerName: string }) {
    const player = await this.playerService.killPlayer(data.roomId, data.playerName);
    this.server.to(`room_${data.roomId}`).emit('playerKilled', player);
  
    // Xonadagi barcha tirik o‘yinchilar ro‘yxatini qayta yuborish
    const alivePlayers = await this.playerService.getAlivePlayers(data.roomId);
    this.server.to(`room_${data.roomId}`).emit('updatePlayers', alivePlayers);
  }
  

  @SubscribeMessage('endGame')
  async handleEndGame(@MessageBody() data: { roomId: number }) {
    const result = await this.playerService.endGame(data.roomId);
  
    if (result.winner) {
      this.server.to(`room_${data.roomId}`).emit('gameEnded', { winner: result.winner });
    } else {
      this.server.to(`room_${data.roomId}`).emit('gameEnded', { message: "Hech kim g‘alaba qozonmadi." });
    }
  }
  

@SubscribeMessage('leaveRoom')
async handleLeaveRoom(@MessageBody() data: { roomId: number, username: string }) {
  await this.playerService.leaveRoom(data.roomId, data.username);
  this.server.to(`room_${data.roomId}`).emit('playerLeft', { username: data.username });
}



}