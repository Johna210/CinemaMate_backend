import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';
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

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  numberOfSeats: number;
}
