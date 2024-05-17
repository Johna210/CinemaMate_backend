import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchList } from './watchlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(WatchList)
    private watchListRepository: Repository<WatchList>,
  ) {}

  // To create watchlist using the userId and movieId as parameter
  async createWatchList(userId: number, movieId: number) {
    const movies = await this.getMovieId(movieId);
    if (movies.length === 0) {
      const watchList = this.watchListRepository.create({ userId, movieId });
      return this.watchListRepository.save(watchList);
    }
  }
  // returns the userId from the database and this will be used to get watchlist by userID
  getUserId(userId: number) {
    return this.watchListRepository.find({ where: { userId } });
  }

  // returns the movieIs form the database and this will be used to remove watchlist by movesId
  getMovieId(movieId: number) {
    return this.watchListRepository.find({ where: { movieId } });
  }

  // get all the watchist by the userId
  async getAllByUserId(userId: number) {
    const watch = await this.getUserId(userId);

    if (!watch) {
      throw new Error('user id not fonund');
    }

    return this.watchListRepository.find({ where: { userId } });
  }

  // removes the watchlist using userId to find the current user and movieId to actual remove it from the watchlist
  async removefromWatchList(userId: number, movieId: number) {
    const watchUser = await this.getUserId(userId);
    if (!watchUser) {
      throw new NotFoundException('user not found');
    }

    const watchMovie = await this.getMovieId(movieId);

    return this.watchListRepository.remove(watchMovie);
  }
}
