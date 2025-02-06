import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateVoteDto {
  @IsInt()
  roomId: number;

  @IsNumber()
  from: number;

  @IsNumber()
  to: number;
}

export class UpdateVoteDto {
  @IsOptional()
  @IsInt()
  roomId?: number;

  @IsOptional()
  @IsNumber()
  from?: number;

  @IsOptional()
  @IsNumber()
  to?: number;
}