import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class WatchList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;
}
