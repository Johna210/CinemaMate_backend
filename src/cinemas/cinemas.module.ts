import { Module, forwardRef } from '@nestjs/common';
import { CinemasController } from './cinemas.controller';
import { CinemasService } from './cinemas.service';
import { Cinema } from './cinema.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaAuthService } from '../auth/cinema-auth/cinema-auth.service';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema])],
  controllers: [CinemasController],
  providers: [CinemasService, CinemaAuthService],
  exports: [CinemasService, TypeOrmModule, CinemaAuthService],
})
export class CinemasModule {}
