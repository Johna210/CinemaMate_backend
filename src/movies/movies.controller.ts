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
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/cinema-auth/guards/jwt-cinemaAuth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {} // Add closing parenthesis here

  // http://localhost:3000/movies/addmovie -> For adding a new Movie.
  @Post('/addMovie')
  @UseGuards(JwtAuthGuard)
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
    @UploadedFile() file: Express.Multer.File, // Add type annotation here
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
}
