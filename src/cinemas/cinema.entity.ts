import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

import { Movies } from 'src/movies/movies.entity';
import { Booking } from 'src/booking/booking.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  cinemaName: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 10000 })
  description: string;

  @Column()
  imagePath: string;

  @OneToMany(() => Movies, (movies) => movies.cinema)
  movies: Movies[];

  @OneToMany(() => Booking, (booking) => booking.cinema)
  bookings: Booking[];

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
