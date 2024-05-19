import { Expose, Transform } from 'class-transformer';
import { MovieDto } from 'src/movies/dto/movie.dto';

export class BookingDto {
  @Expose()
  id: number;

  @Transform(({ obj }) => obj.user.username)
  @Expose()
  userName: string;

  @Transform(({ obj }) => obj.user.email)
  @Expose()
  email: string;

  @Transform(({ obj }) => obj.movie)
  @Expose()
  movie: MovieDto;

  @Transform(({ obj }) => obj.cinema.id)
  @Expose()
  cinemaId: number;

  @Transform(({ obj }) => obj.cinema.cinemaName)
  @Expose()
  cinemaName: string;

  @Transform(({ obj }) => obj.cinema.email)
  @Expose()
  cinemaemail: string;
}
