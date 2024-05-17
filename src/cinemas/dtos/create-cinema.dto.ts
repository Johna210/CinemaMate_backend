import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCinemaDto {
  @IsEmail()
  email: string;

  @IsString()
  cinemaName: string;

  @IsString()
  description: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  imagePath: string;
}
