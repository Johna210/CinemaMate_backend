import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../Interceptors/serialize.iterceptor';
import { UserDto } from './dtos/user.dto';
import { signinUserDto } from './dtos/signin-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { JwtAuthGuard } from '../auth/userauth/guards/jwt-userAuth.guard';
import { WatchlistService } from '../watchlist/watchlist.service';
import { MoviesService } from '../movies/movies.service';

// @Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private watchListService: WatchlistService,
    private MoviesService: MoviesService,
  ) {}

  @Get('/current')
  @UseGuards(JwtAuthGuard)
  whoAmI(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  @Serialize(UserDto)
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(
      body.fullname,
      body.email,
      body.username,
      body.password,
    );
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: signinUserDto) {
    const user = await this.usersService.login(body.email, body.password);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delaccount')
  removeUser(@Request() req) {
    return this.usersService.remove(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  updateUser(@Request() req, @Body() body: UpdateUserDto) {
    const user = req.user;
    return this.usersService.update(parseInt(user.sub), body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/changePass')
  updatePassword(@Request() req, @Body() body: UpdatePasswordDto) {
    const user = req.user;

    return this.usersService.changePassword(
      user.sub,
      body.currentPassword,
      body.newPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/add/:id')
  addToWatchlist(@Param('id') id: string, @Request() req) {
    return this.watchListService.createWatchList(
      parseInt(req.user.sub),
      parseInt(id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/del/:id')
  removeFromWatchList(@Param('id') id: string, @Request() req) {
    return this.watchListService.removefromWatchList(
      parseInt(req.user.sub),
      parseInt(id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/movie/:id')
  getMovieByID(@Param('id') id: string) {
    return this.MoviesService.findMovieById(parseInt(id));
  }
  @UseGuards(JwtAuthGuard)
  @Get('/watchlist')
  getUserWatchList(@Request() req) {
    return this.watchListService.getAllByUserId(parseInt(req.user.sub));
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/cinema/:id')
  // getMoviesFromCinema(@Param('id') id: string) {
  //   return this.MoviesService.getCinemaMovies(parseInt(id));
  // }

  // Add Booking controllers here
}
