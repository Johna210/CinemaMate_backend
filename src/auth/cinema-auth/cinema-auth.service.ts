import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cinema } from '../../cinemas/cinema.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../constants';

@Injectable()
export class CinemaAuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(cinema: Cinema) {
    const token = await this.jwtService.signAsync(
      {
        sub: cinema.id,
        cinemaName: cinema.cinemaName,
        email: cinema.email,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: '2 days',
      },
    );

    return { cinematoken: token };
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePasswords(password: string, storedPassword: string) {
    return await bcrypt.compare(password, storedPassword);
  }
}
