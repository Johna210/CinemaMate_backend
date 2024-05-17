import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateCinemaDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  cinemaName: string;

  @IsString()
  @IsOptional()
  description: string;
}
