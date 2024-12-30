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
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/images/cinemaProfiles'),
      serveRoot: '/src/images/cinemaProfiles',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/images/movieImages'),
      serveRoot: '/src/images/movieImages',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          database: config.get<string>('POSTGRES_DB'),
          entities: [User, Cinema, Movies, WatchList, Booking, Admin],
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
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, CinemaAuthService],
})
export class AppModule {}
