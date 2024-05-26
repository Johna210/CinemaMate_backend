import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Movies } from 'src/movies/movies.entity';
import { WatchList } from 'src/watchlist/watchlist.entity';
import { Booking } from 'src/booking/booking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  fullname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Movies, (movie) => movie.users)
  @JoinTable()
  movies: Movies[];

  @OneToMany(() => WatchList, (watchlist) => watchlist.user)
  watchList: WatchList[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @Column({ default: false })
  suspended: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
