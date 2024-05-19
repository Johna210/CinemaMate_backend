import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';
import { CinemasService } from 'src/cinemas/cinemas.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private userService: UsersService,
    private moviesService: MoviesService,
    private cinemasService: CinemasService,
  ) {}

  //* Book a movie or create a booking
  async createAbooking(userId: number, cinemaId: number, movieId: number) {
    // get the user, the movie and the cinema
    const user = await this.userService.findOneById(userId);
    var movie = await this.moviesService.findMovieById(movieId);
    const cinema = await this.cinemasService.findCinemaById(cinemaId);

    console.log(user, movie, cinema);

    if (!user || !movie || !cinema) {
      throw new NotFoundException('user, cinema or movie not found');
    }

    // get the number of seats of a movie
    var numberOfSeats = movie.numberOfSeats;

    if (numberOfSeats > 0) {
      movie = await this.moviesService.decreaseSeats(movieId);
    } else {
      throw new NotImplementedException('No number of seats left.');
    }

    // Approve the booking
    const booking = this.bookingRepository.create({ user, movie, cinema });
    return this.bookingRepository.save(booking);
  }

  //* Get all movies booked by a cinema
  async getBookedMoviesFromCinema(cinemaId: number) {
    // Find all bookings for the given cinema
    const bookings = await this.bookingRepository.find({
      where: { cinema: { id: cinemaId } },
      relations: ['movie'],
    });

    // Extract the movies from the bookings
    const movies = bookings.map((booking) => booking.movie);

    return movies;
  }

  //* Get all movies booked by a user
  async getUserBookedMovies(userId: number) {
    const bookings = await this.bookingRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'],
    });

    console.log(bookings);
    const movies = bookings.map((booking) => booking.movie);

    return movies;
  }

  //? Approve a users Booking
}
