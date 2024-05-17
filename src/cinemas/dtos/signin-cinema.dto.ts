import { IsEmail, IsString } from 'class-validator';

export class SigninCinemaDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
