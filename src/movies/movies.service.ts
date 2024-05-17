import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies) private moviesRepository: Repository<Movies>,
  ) {}

  //for Creating movies
  async createMovies(
    title: string,
    genre: string,
    day: string,
    showTime: string,
    imageUrl: string,
    cinemaId: number,
  ) {
    const newmovie = this.moviesRepository.create({
      title,
      genre,
      day,
      showTime,
      imageUrl,
      cinemaId,
    });

    return this.moviesRepository.save(newmovie);
  }

  // find all the movies that have similar cinemaid
  findByid(cinemaId: number) {
    return this.moviesRepository.find({ where: { cinemaId } });
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
      throw new Error('user not found');
    }
    return this.moviesRepository.remove(movie);
  }

  // to update the movie by using its id
  async updateMovie(id: number, attrs: Partial<Movies>) {
    const movie = await this.findMovieById(id);

    if (!movie) {
      throw new Error('Movie not found');
    }

    Object.assign(movie, attrs);

    return this.moviesRepository.save(movie);
  }

  // Get all movies from a particular cinema
  async getCinemaMovies(id: number) {
    return this.moviesRepository.find({ where: { cinemaId: id } });
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
      cinemaId: movie.cinemaId,
    }));
  }
}
