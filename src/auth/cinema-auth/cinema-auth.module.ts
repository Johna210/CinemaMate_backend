import { Module } from '@nestjs/common';
import { CinemaAuthService } from './cinema-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { JwtStrategy } from './strategies/jwt-cinemaAuth.strategy';
import { JwtAuthGuard } from './guards/jwt-cinemaAuth.guard';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  providers: [CinemaAuthService, JwtAuthGuard, JwtStrategy, ConfigService],
  exports: [CinemaAuthService],
})
export class CinemaAuthModule {}
