import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Serialize } from 'src/Interceptors/serialize.iterceptor';
import { BookingDto } from './dtos/booking.dto';
import { UserJwtAuthGuard } from 'src/auth/userauth/guards/jwt-userAuth.guard';
import { JwtAuthGuard } from 'src/auth/cinema-auth/guards/jwt-cinemaAuth.guard';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('/create')
  @UseGuards(UserJwtAuthGuard)
  @Serialize(BookingDto)
  async bookMovie(@Body() body) {
    return await this.bookingService.createAbooking(
      31,
      parseInt(body.cinemaId),
      parseInt(body.movieId),
    );
  }

  @Get('/cinema')
  @UseGuards(UserJwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  async getCinemaBookings() {
    return await this.bookingService.getBookedMoviesFromCinema(13);
  }

  @Get('/user')
  @UseGuards(UserJwtAuthGuard)
  async getUserBookings() {
    return await this.bookingService.getUserBookedMovies(31);
  }
}
