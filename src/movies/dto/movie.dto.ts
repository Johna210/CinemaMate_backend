import { Expose, Transform } from 'class-transformer';

export class MovieDto {
  @Expose()
  id: number;

  @Expose()
  genre: string;

  @Expose()
  day: string;

  @Expose()
  showTime: string;

  @Expose()
  numberOfSeats: number;

  @Transform(({ obj }) => obj.cinema.id)
  @Expose()
  cinemaId: number;
}
