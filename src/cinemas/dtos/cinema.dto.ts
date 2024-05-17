import { Expose } from 'class-transformer';

export class CinemaDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
