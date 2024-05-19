import {
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { UserJwtAuthGuard } from '../auth/userauth/guards/jwt-userAuth.guard';
import { Serialize } from 'src/Interceptors/serialize.iterceptor';
import { WatchListDto } from './dto/watchlist.dto';

@Controller('watchlist')
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  //http://localhost:3000/watchlist
  @UseGuards(UserJwtAuthGuard)
  @Get()
  WatchList(@Request() req) {
    return this.watchlistService.getUserWatchList(parseInt(req.user.sub));
  }

  // http:localhost:3000/watchlist/add/id
  @UseGuards(UserJwtAuthGuard)
  @Serialize(WatchListDto)
  @Post('/add/:id')
  addMovieToWatchlist(@Request() req, @Param('id') movieId: number) {
    return this.watchlistService.addToWatchList(
      parseInt(req.user.sub),
      movieId,
    );
  }

  // http:localhost:3000/watchlist/delete/id
  @UseGuards(UserJwtAuthGuard)
  @Delete('/remove/:id')
  async removeFromWatchlist(@Request() req, @Param('id') movieId: number) {
    return await this.watchlistService.removeFromWatchList(
      parseInt(req.user.sub),
      movieId,
    );
  }
}
