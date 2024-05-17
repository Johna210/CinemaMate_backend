import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from './cinema.entity';
import { CinemaAuthService } from '../auth/cinema-auth/cinema-auth.service';

@Injectable()
export class CinemasService {
  constructor(
    @InjectRepository(Cinema) private repo: Repository<Cinema>,
    private authService: CinemaAuthService,
  ) {}

  //* Service to create a cinema account
  async create(
    cinemaName: string,
    email: string,
    password: string,
    description: string,
    imagePath: string,
  ) {
    const cinemas = await this.findEmail(email);
    if (cinemas.length > 0) {
      throw new BadRequestException('email already taken!');
    }

    const cinemaNames = await this.findCinemaName(cinemaName);
    if (cinemaNames.length > 0) {
      throw new BadRequestException('cinemaName already taken');
    }

    const hashedPassword = await this.authService.hashPassword(password);
    const cinema = this.repo.create({
      cinemaName,
      email,
      password: hashedPassword,
      description,
      imagePath,
    });

    return this.repo.save(cinema);
  }

  //* Service function for login
  async login(email: string, password: string) {
    const cinema = await this.findCinemaByEmail(email);

    if (!cinema) {
      throw new NotFoundException('cinema not found');
    }
    const match = await this.authService.comparePasswords(
      password,
      cinema.password,
    );

    if (!match) {
      throw new BadRequestException('Incorrect Password');
    }

    // token
    const token = await this.authService.generateJwt(cinema);

    return token;
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }

    const cinema = await this.repo.findOneBy({
      id: id,
    });

    return cinema;
  }

  //* In order to check if an email already exists
  async findEmail(email: string) {
    const cinemas = await this.repo.find({
      where: { email: email },
    });

    return cinemas;
  }

  //* Inorder to check if cinemaName is already taken
  async findCinemaName(cinemaName: string) {
    const cinemas = await this.repo.find({
      where: { cinemaName: cinemaName },
    });

    return cinemas;
  }

  findCinemaByEmail(email: string) {
    return this.repo.findOne({ where: { email: email } });
  }

  findCinemaByCinemaName(cinemaName: string) {
    return this.repo.findOne({ where: { cinemaName: cinemaName } });
  }

  findCinemaById(id: number) {
    return this.repo.findOne({ where: { id: id } });
  }
  // For updating CinemaName, email and description
  async update(id: number, attrs: Partial<Cinema>) {
    const cinema = await this.findOne(id);

    if (!cinema) {
      throw new NotFoundException('cinema not found');
    }
    // Take all the values of attrs and copy them directly to users
    Object.assign(cinema, attrs);

    return this.repo.save(cinema);
  }

  async remove(id: number) {
    const cinema = await this.findOne(id);

    if (!cinema) {
      throw new NotFoundException('cinema not found');
    }

    return this.repo.remove(cinema);
  }

  async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const cinema = await this.findOne(id);

    if (!cinema) {
      throw new NotFoundException('user not found');
    }

    if (!this.authService.comparePasswords(currentPassword, cinema.password)) {
      throw new BadRequestException('Incorrect password');
    }

    const newPasswordHash = await this.authService.hashPassword(newPassword);

    cinema.password = newPasswordHash;

    return this.repo.save(cinema);
  }

  async AddImagePath(id: number, filename: string) {
    if (!id) {
      return 'No cinema Id provided';
    }

    const cinema = await this.findOne(id);
    cinema.imagePath = `./images/cinemaProfiles/${filename}`;

    return this.repo.save(cinema);
  }
  // FindAll cinemas
  async findCinemas() {
    return this.repo.find();
  }

  // addMovie() {}

  // updateMovie() {}

  // removeMovie() {}
}
