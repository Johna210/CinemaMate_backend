import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CinemasModule } from 'src/cinemas/cinemas.module';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';
import { CinemasService } from 'src/cinemas/cinemas.service';
import { Booking } from './booking.entity';
import { UserauthService } from 'src/auth/userauth/userauth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    UsersModule,
    CinemasModule,
    MoviesModule,
  ],
  providers: [BookingService, CinemasService, UserauthService],
  controllers: [BookingController],
})
export class BookingModule {}
