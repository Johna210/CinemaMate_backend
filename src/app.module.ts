import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { MoviesModule } from './movies/movies.module';
import { User } from './users/user.entity';
import { Cinema } from './cinemas/cinema.entity';
import { UserauthModule } from './auth/userauth/userauth.module';
import { CinemaAuthModule } from './auth/cinema-auth/cinema-auth.module';
import { CinemaAuthService } from './auth/cinema-auth/cinema-auth.service';
import { Movies } from './movies/movies.entity';
import { WatchlistModule } from './watchlist/watchlist.module';
import { WatchList } from './watchlist/watchlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'cinema',
      entities: [User, Cinema, Movies, WatchList],
      synchronize: true,
    }),
    UsersModule,
    CinemasModule,
    MoviesModule,
    UserauthModule,
    CinemaAuthModule,
    WatchlistModule,
  ],
  controllers: [AppController],
  providers: [AppService, CinemaAuthService],
})
export class AppModule {}
