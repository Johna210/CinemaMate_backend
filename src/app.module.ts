import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/booking.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: config.get<string>('USER_NAME'),
          password: config.get<string>('PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: [User, Cinema, Movies, WatchList, Booking],
          synchronize: true,
        };
      },
    }),

    UsersModule,
    CinemasModule,
    MoviesModule,
    UserauthModule,
    CinemaAuthModule,
    WatchlistModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService, CinemaAuthService],
})
export class AppModule {}
