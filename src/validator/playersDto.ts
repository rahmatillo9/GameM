import { IsInt, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreatePlayerDto {
  @IsInt()
  roomId: number;

  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsEnum(["alive", "dead"])
  status?: string;
}

export class UpdatePlayerDto {
  @IsOptional()
  @IsInt()
  roomId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsEnum(["alive", "dead"])
  status?: string;
}