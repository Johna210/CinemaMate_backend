import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserauthService } from '../auth/userauth/userauth.service';
import { MoviesService } from '../movies/movies.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private authService: UserauthService,
    private moviesService: MoviesService,
  ) {}

  async create(
    fullname: string,
    email: string,
    username: string,
    password: string,
  ) {
    const users = await this.findEmail(email);
    if (users.length > 0) {
      throw new BadRequestException('email already taken!');
    }

    const usernames = await this.findUsername(username);
    if (usernames.length > 0) {
      throw new BadRequestException('username already taken');
    }

    const hashedPassword = await this.authService.hashPassword(password);
    const user = this.repo.create({
      fullname,
      email,
      username,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('user not found');
    }

    const match = await this.authService.comparePasswords(
      password,
      user.password,
    );

    if (!match) {
      throw new BadRequestException('Incorrect password');
    }

    const token = this.authService.generateJwt(user);

    return token;
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }

    const user = await this.repo.findOneBy({
      id: id,
    });

    return user;
  }

  async findUserByEmail(email: string) {
    return this.repo.findOne({ where: { email: email } });
  }

  async findEmail(email: string) {
    const users = await this.repo.find({
      where: { email: email },
    });

    return users;
  }

  async findUsername(username: string) {
    const users = await this.repo.find({
      where: { username: username },
    });

    return users;
  }

  //   attrs short for attributes
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    // Takes all the values of attrs and copy them directly to users
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }

  async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!this.authService.comparePasswords(currentPassword, user.password)) {
      throw new BadRequestException('Incorrect password');
    }

    const newPasswordHash = await this.authService.hashPassword(newPassword);

    user.password = newPasswordHash;

    return this.repo.save(user);
  }
}
