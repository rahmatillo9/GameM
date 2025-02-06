import { IsInt, IsString, Min } from 'class-validator';

export class JoinRoomDto {
  @IsInt({ message: 'roomId butun son bo‘lishi kerak' })
  @Min(1, { message: 'roomId 1 dan katta bo‘lishi kerak' })
  roomId: number;

  @IsString({ message: 'username string bo‘lishi kerak' })
  username: string;
}
