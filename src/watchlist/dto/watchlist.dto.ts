import { Expose, Transform } from 'class-transformer';
import { MovieDto } from 'src/movies/dto/movie.dto';

export class WatchListDto {
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
}
