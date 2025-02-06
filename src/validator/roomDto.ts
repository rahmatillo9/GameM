import { IsString, IsInt, IsEnum, IsOptional } from 'class-validator';

export class CreateRoomDto {
    
    @IsString()
  name: string;

  @IsInt()
  maxP: number;

  @IsOptional()
  @IsEnum(["waiting", "playing", "finished"])
  status?: string;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  maxP?: number;

  @IsOptional()
  @IsEnum(["waiting", "playing", "finished"])
  status?: string;
}