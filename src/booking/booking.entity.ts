import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Cinema } from 'src/cinemas/cinema.entity';
import { Movies } from 'src/movies/movies.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Movies, (movie) => movie.bookings)
  movie: Movies;

  @ManyToOne(() => Cinema, (cinema) => cinema.bookings)
  cinema: Cinema;
}
