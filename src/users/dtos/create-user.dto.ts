import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  fullname: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
