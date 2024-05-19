import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './movies.entity';
import { Repository } from 'typeorm';
import { CinemasService } from 'src/cinemas/cinemas.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies) private moviesRepository: Repository<Movies>,
    private cinemaService: CinemasService,
  ) {}

  //for Creating movies
  async createMovies(
    title: string,
    genre: string,
    day: string,
    showTime: string,
    imageUrl: string,
    numberOfSeats: number,
    cinemaId: number,
  ) {
    const newmovie = this.moviesRepository.create({
      title,
      genre,
      day,
      showTime,
      imageUrl,
      numberOfSeats,
    });

    const cinema = await this.cinemaService.findCinemaById(cinemaId);
    newmovie.cinema = cinema;

    return this.moviesRepository.save(newmovie);
  }

  // find all the movies that have similar cinema_id
  async findCinemaMovies(cinemaId: number) {
    const cinema = await this.cinemaService.findCinemaById(cinemaId);
    const movies = await this.moviesRepository.find({ where: { cinema } });
    return movies;
  }

  // Decrease the number of seats
  async decreaseSeats(movieId: number) {
    const movie = await this.moviesRepository.findOne({
      where: { id: movieId },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    var currentNumberOfSeats = movie.numberOfSeats;
    movie.numberOfSeats = currentNumberOfSeats - 1;

    return this.moviesRepository.save(movie);
  }

  //returns all movies that have the same day
  findByDay(day: string) {
    return this.moviesRepository.findOne({ where: { day: day } });
  }

  //to find the movie by its own id  we will use it in the update and remove funcitons
  async findMovieById(id: number) {
    return await this.moviesRepository.findOne({ where: { id } });
  }

  //to remove a movie by using its id
  async removeMovie(id: number) {
    const movie = await this.findMovieById(id);
    if (!movie) {
      throw new Error('movie not found');
    }
    return this.moviesRepository.remove(movie);
  }

  // to update the movie by using its id
  async updateMovie(id: number, attrs: Partial<UpdateMovieDto>) {
    const movie = await this.findMovieById(id);

    if (!movie) {
      throw new Error('Movie not found');
    }

    Object.assign(movie, attrs);

    return this.moviesRepository.save(movie);
  }

  //returns an Array of all moves
  async getAllMoveis() {
    const moveis = await this.moviesRepository.find();

    return moveis.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genre: movie.genre,
      day: movie.day,
      showTime: movie.showTime,
      imageUrl: movie.imageUrl,
      numberOfSeats: movie.numberOfSeats,
    }));
  }
}
