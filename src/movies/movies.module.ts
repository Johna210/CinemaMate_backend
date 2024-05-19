import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './movies.entity';
import { CinemasService } from 'src/cinemas/cinemas.service';
import { CinemasModule } from 'src/cinemas/cinemas.module';
import { Cinema } from 'src/cinemas/cinema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movies]), CinemasModule],
  controllers: [MoviesController],
  providers: [CinemasService, MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
