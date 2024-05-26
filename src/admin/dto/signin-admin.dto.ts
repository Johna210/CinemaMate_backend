import { IsEmail, IsString } from 'class-validator';

export class signinAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
