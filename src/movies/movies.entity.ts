import { Cinema } from 'src/cinemas/cinema.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { WatchList } from 'src/watchlist/watchlist.entity';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  day: string;

  @Column()
  showTime: string;

  @Column()
  imageUrl: string;

  @Column()
  numberOfSeats: number;

  @ManyToOne(() => Cinema, (cinema) => cinema.movies)
  cinema: Cinema;

  @ManyToMany(() => User, (user) => user.movies)
  users: User[];

  @OneToMany(() => WatchList, (watchList) => watchList.movie)
  watchList: WatchList[];
}
