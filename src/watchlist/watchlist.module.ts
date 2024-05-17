import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchList } from './watchlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchList])],
  providers: [WatchlistService],
  exports: [WatchlistService, WatchlistModule],
})
export class WatchlistModule {}
