import {
  Controller,
  Post,
  Body,
  Request,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/cinema-auth/guards/jwt-cinemaAuth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Serialize } from 'src/Interceptors/serialize.iterceptor';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  // http://localhost:3000/movies/cinema -> returns movies of a certain cinema
  @Get('/cinema')
  @UseGuards(JwtAuthGuard)
  async getCinemaMovies(@Request() req) {
    return await this.moviesService.findCinemaMovies(parseInt(req.user.sub));
  }

  // http://localhost:3000/movies/addmovie -> For adding a new Movie.
  @Post('/addMovie')
  @UseGuards(JwtAuthGuard)
  @Serialize(MovieDto)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/images/MovieImages',
        filename: (req, file, callback) => {
          const filename = `${file.originalname}`;
          callback(null, filename);
          return filename;
        },
      }),
    }),
  )
  async addMovie(
    @Body() body: CreateMovieDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const newMovie = await this.moviesService.createMovies(
      body.title,
      body.genre,
      body.day,
      body.showTime,
      `src/images/movieImages/${file.filename}`,
      Number(body.numberOfSeats),
      parseInt(req.user.sub),
    );
    return newMovie;
  }

  // http://localhost:3000/movies/update/movieId -> To update an exisiting movies details
  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  updateMovie(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return this.moviesService.updateMovie(parseInt(id), body);
  }

  // http://localhost:3000/movies/remove
  @Delete('/remove/:id')
  @UseGuards(JwtAuthGuard)
  removeMovie(@Param('id') id: string) {
    return this.moviesService.removeMovie(parseInt(id));
  }
}
