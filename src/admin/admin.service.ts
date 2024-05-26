import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CinemasService } from 'src/cinemas/cinemas.service';
import { UserauthService } from 'src/auth/userauth/userauth.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private AdminRepository: Repository<Admin>,
    private usersService: UsersService,
    private cinemaService: CinemasService,
    private authService: UserauthService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await this.authService.hashPassword(
      createAdminDto.password,
    );

    const admin = this.AdminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    return this.AdminRepository.save(admin);
  }

  findAll() {
    return this.AdminRepository.find();
  }

  async adminLogin(username: string, password: string) {
    const admin = await this.AdminRepository.findOneBy({ username });

    if (!admin) {
      throw new Error('Admin not found');
    }

    const match = this.authService.comparePasswords(password, admin.password);

    if (!match) {
      throw new Error('Incorrect password');
    }

    var user = new User();
    user.id = admin.id;
    user.username = admin.username;
    user.email = ''; // replace with the actual value
    user.fullname = ''; // replace with the actual value
    user.password = ''; // replace with the actual value
    user.movies = []; // replace with the actual value
    user.watchList = []; // replace with the actual value

    const token = this.authService.generateJwt(user);

    return token;
  }

  findOne(id: number) {}

  update(id: number, updateAdminDto: UpdateAdminDto) {}

  remove(id: number) {}

  // get all cinemas
  async getAllCinemas() {
    return this.cinemaService.findCinemas();
  }

  // get all users
  async getAllUsers() {
    return this.usersService.findAllUsers();
  }

  // get a user
  async getUser(id: number) {
    return await this.usersService.findOneById(id);
  }

  // get a cinema
  async getCinema(id: number) {
    return await this.cinemaService.findCinemaById(id);
  }

  // delete a cinema
  async deleteCinema(id: number) {
    return await this.cinemaService.remove(id);
  }

  // delete a user
  async deleteUser(id: number) {
    return await this.usersService.remove(id);
  }

  // suspend a cinema
  async suspendCinema(id: number) {
    return await this.cinemaService.update(id, {
      suspended: true,
    });
  }

  // unsuspend a cinema
  async unsuspendCinema(id: number) {
    return await this.cinemaService.update(id, {
      suspended: false,
    });
  }

  // suspend a user
  async suspendUser(id: number) {
    return await this.usersService.update(id, {
      suspended: true,
    });
  }

  // unsuspend a user
  async unsuspendUser(id: number) {
    return await this.usersService.update(id, {
      suspended: false,
    });
  }
}
