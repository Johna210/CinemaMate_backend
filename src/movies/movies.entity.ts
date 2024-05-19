import { Cinema } from 'src/cinemas/cinema.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
}
