import { 
    WebSocketGateway, 
    WebSocketServer, 
    SubscribeMessage, 
    MessageBody, 
    ConnectedSocket 
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { RoomService } from './rooms.service';
  import { PlayerService } from 'src/players/players.service';
  import { VoteService } from 'src/votes/votes.service';
  import { CreateRoomDto } from 'src/validator/roomDto';
  import { JoinRoomDto } from 'src/validator/JoinRoomDto';
import { CreateVoteDto } from 'src/validator/votesDto';
  
  @WebSocketGateway(3000, { cors: true }) // CORS muammosi bo‘lmasligi uchun
  export class RoomGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(
      private readonly roomService: RoomService,
      private readonly playerService: PlayerService,
      private readonly voteService: VoteService,
    ) {}
  
    /** 
     * XONA YARATISH 
     */
    @SubscribeMessage('createRoom')
    async handleCreateRoom(@MessageBody() createRoomDto: CreateRoomDto) {
      const room = await this.roomService.create(createRoomDto);
      this.server.emit('roomCreated', room); // Hamma foydalanuvchilarga xabar berish
    }
  
    /** 
     * O‘YINCHINI XONAGA QO‘SHISH
     */
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
      @MessageBody() joinRoomDto: JoinRoomDto, 
      @ConnectedSocket() client: Socket
    ) {
      const player = await this.playerService.create({...joinRoomDto} as any);
      client.join(`room-${joinRoomDto.roomId}`); // Socket-ni xonaga qo‘shish
      this.server.to(`room-${joinRoomDto.roomId}`).emit('playerJoined', player); // Xonadagi o‘yinchilarga xabar berish
    }
  
    /** 
     * O‘YINDAN CHIQISH
     */
    // @SubscribeMessage('leaveRoom')
    // async handleLeaveRoom(
    //   @MessageBody() data: { playerId: number, roomId: number },
    //   @ConnectedSocket() client: Socket
    // ) {
    //   await this.playerService.killPlayer(data.playerId);
    //   client.leave(`room-${data.roomId}`);
    //   this.server.to(`room-${data.roomId}`).emit('playerLeft', data.playerId);
    // }
  
    /** 
     * O‘YIN BOSHLASH
     */
    @SubscribeMessage('startGame')
    async handleStartGame(@MessageBody() roomId: number) {
      try {
        // O'yinni boshlash va rollarni taqsimlash
        const players = await this.roomService.assignRoles(roomId);
  
        // Barcha o‘yinchilarga yangi rollarni yuboramiz
        this.server.to(`room-${roomId}`).emit('gameStarted', { message: "O'yin boshlandi!", players });
  
        return { success: true, message: "O'yin boshlandi!" };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  
    /** 
     * OVOZ BERISH
     */
    @SubscribeMessage('vote')
    async handleVote(
      @MessageBody() data: CreateVoteDto
    ) {
      const vote = await this.voteService.create(data);
      this.server.to(`room-${data.roomId}`).emit('newVote', vote);
    }
  
    /** 
     * O‘YIN YAKUNLANISHI
     */
    @SubscribeMessage('endGame')
    async handleEndGame(@MessageBody() data: { roomId: number }) {
      this.server.to(`room-${data.roomId}`).emit('gameEnded', { message: 'O‘yin tugadi!' });
    }
  }
  