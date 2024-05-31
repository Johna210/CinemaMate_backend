import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './movies.entity';
import { CinemasService } from 'src/cinemas/cinemas.service';
import { CinemasModule } from 'src/cinemas/cinemas.module';
import { Cinema } from 'src/cinemas/cinema.entity';
import { WatchlistModule } from 'src/watchlist/watchlist.module';
import { WatchlistService } from 'src/watchlist/watchlist.service';
import { WatchList } from 'src/watchlist/watchlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movies, WatchList]),
    CinemasModule,
    WatchlistModule,
  ],
  controllers: [MoviesController],
  providers: [CinemasService, MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
