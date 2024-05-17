import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

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
