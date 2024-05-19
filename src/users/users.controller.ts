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
import { UserJwtAuthGuard } from '../auth/userauth/guards/jwt-userAuth.guard';
import { WatchlistService } from '../watchlist/watchlist.service';
import { MoviesService } from '../movies/movies.service';

// @Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/current')
  @UseGuards(UserJwtAuthGuard)
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

  @UseGuards(UserJwtAuthGuard)
  @Delete('/delaccount')
  removeUser(@Request() req) {
    return this.usersService.remove(req.user.sub);
  }

  @UseGuards(UserJwtAuthGuard)
  @Patch('/edit')
  updateUser(@Request() req, @Body() body: UpdateUserDto) {
    const user = req.user;
    return this.usersService.update(parseInt(user.sub), body);
  }

  @UseGuards(UserJwtAuthGuard)
  @Patch('/changePass')
  updatePassword(@Request() req, @Body() body: UpdatePasswordDto) {
    const user = req.user;

    return this.usersService.changePassword(
      user.sub,
      body.currentPassword,
      body.newPassword,
    );
  }
}
