import { Module } from '@nestjs/common';
import { UserauthService } from './userauth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-userAuth.strategy';
import { JwtAuthGuard } from './guards/jwt-userAuth.guard';
import { jwtConstants } from '../constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  providers: [UserauthService, JwtAuthGuard, JwtStrategy, ConfigService],
  exports: [UserauthService],
})
export class UserauthModule {}
