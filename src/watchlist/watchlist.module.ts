import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchList } from './watchlist.entity';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';
import { Movies } from 'src/movies/movies.entity';
import { UsersModule } from 'src/users/users.module';
import { UserauthService } from 'src/auth/userauth/userauth.service';
import { CinemasModule } from 'src/cinemas/cinemas.module';
import { WatchlistController } from './watchlist.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WatchList, Movies]),
    UsersModule,
    CinemasModule,
  ],
  providers: [WatchlistService, UsersService, MoviesService, UserauthService],
  exports: [WatchlistService, WatchlistModule],
  controllers: [WatchlistController],
})
export class WatchlistModule {}
