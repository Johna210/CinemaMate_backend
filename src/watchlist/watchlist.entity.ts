import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Movies } from 'src/movies/movies.entity';
@Entity()
export class WatchList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.watchList)
  user: User;

  @ManyToOne(() => Movies, (movie) => movie.watchList)
  movie: Movies;
}
