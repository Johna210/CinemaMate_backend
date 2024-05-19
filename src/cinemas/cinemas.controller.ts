import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  Get,
  Request,
  Delete,
  Patch,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { CreateCinemaDto } from './dtos/create-cinema.dto';
import { CinemasService } from './cinemas.service';
import { JwtAuthGuard } from '../auth/cinema-auth/guards/jwt-cinemaAuth.guard';
import { SigninCinemaDto } from './dtos/signin-cinema.dto';
import { UpdateCinemaDto } from './dtos/update-cinema.dto';
import { UpdatePasswordDto } from '../users/dtos/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MoviesService } from '../movies/movies.service';
import { UpdateMovieDto } from '../movies/dto/update-movie.dto';
import { jwtConstants } from 'src/auth/constants';

@Controller('cinemas')
export class CinemasController {
  constructor(private cinemasService: CinemasService) {}

  @Get('/current')
  @UseGuards(JwtAuthGuard)
  whoAmI(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  async createCinema(@Body() body: CreateCinemaDto) {
    const cinema = await this.cinemasService.create(
      body.cinemaName,
      body.email,
      body.password,
      body.description,
      body.imagePath,
    );

    return cinema;
  }

  @Post('/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/images/cinemaProfiles',
        filename: (req, file, callback) => {
          const filename = `${file.originalname}`;
          callback(null, filename);
          return filename;
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  async uploadImage(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.cinemasService.AddImagePath(
      parseInt(req.user.sub),
      file.filename,
    );
  }

  @Post('/signin')
  async signin(@Body() body: SigninCinemaDto) {
    const cinema = await this.cinemasService.login(body.email, body.password);
    return cinema;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delaccount')
  removeCinema(@Request() req) {
    console.log(req.user);
    return this.cinemasService.remove(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  updateCinema(@Request() req, @Body() body: UpdateCinemaDto) {
    const cinema = req.user;
    return this.cinemasService.update(parseInt(cinema.sub), body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/changePass')
  updatePassword(@Request() req, @Body() body: UpdatePasswordDto) {
    const cinema = req.user;

    return this.cinemasService.changePassword(
      cinema.sub,
      body.currentPassword,
      body.newPassword,
    );
  }

  @Get('/getpath')
  @UseGuards(JwtAuthGuard)
  getImagePath(@Request() req) {
    const cinema = req.user;
    return this.cinemasService.findOne(cinema.sub);
  }

  @Get('/hasImage')
  @UseGuards(JwtAuthGuard)
  hasImage(@Request() req) {
    const cinema = req.user;
    return this.cinemasService.hasImage(cinema.sub);
  }

  @Get('/findCinemas')
  @UseGuards(JwtAuthGuard)
  getAllCinemas() {
    return this.cinemasService.findCinemas();
  }

  @Get('view/:id')
  @UseGuards(JwtAuthGuard)
  getCinema(@Param('id') id: string) {
    return this.cinemasService.findCinemaById(parseInt(id));
  }

  @Get('/info/:id')
  @UseGuards(JwtAuthGuard)
  getInfo(@Param('id') id: string) {
    console.log(id);
    return this.cinemasService.findCinemaById(parseInt(id));
  }
}
