import { IsString, IsOptional } from 'class-validator';
export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsString()
  @IsOptional()
  day: string;

  @IsString()
  @IsOptional()
  showTime: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
