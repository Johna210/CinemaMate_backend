import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsString()
  day: string;

  @IsString()
  showTime: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  numberOfSeats: number;
}
