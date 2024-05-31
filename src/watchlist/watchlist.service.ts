import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchList } from './watchlist.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(WatchList)
    private watchListRepository: Repository<WatchList>,
    private usersService: UsersService,
    private moviesService: MoviesService,
  ) {}

  // * Add movie to watchlist method
  async addToWatchList(userId: number, movieId: number) {
    const user = await this.usersService.findOneById(userId);
    const movie = await this.moviesService.findMovieById(movieId);

    if (!user || !movie) {
      throw new NotFoundException('User or Movie not found');
    }

    const existingEntry = await this.watchListRepository.findOne({
      where: { user, movie },
    });

    if (existingEntry) {
      throw new BadRequestException('Movie is already the user watchList');
    }

    const watchList = this.watchListRepository.create({ user, movie });
    return this.watchListRepository.save(watchList);
  }

  // * remove movie from watchlist method
  async removeFromWatchList(userId: number, movieId: number) {
    const user = await this.usersService.findOneById(userId);
    const movie = await this.moviesService.findMovieById(movieId);

    if (!user || !movie) {
      throw new NotFoundException('User or Movie not found');
    }

    const watchList = await this.watchListRepository.findOne({
      where: { user, movie },
    });

    if (!watchList) {
      throw new NotFoundException('Movie not found in user watchlist');
    }

    return this.watchListRepository.remove(watchList);
  }

  // * return Movies from watchlist method
  async getUserWatchList(userId: number) {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const watchList = await this.watchListRepository.find({
      where: { user },
      relations: ['movie'],
    });
    return watchList.map((wl) => wl.movie);
  }
}
