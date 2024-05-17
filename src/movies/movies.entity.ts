import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  cinemaId: number;
}
