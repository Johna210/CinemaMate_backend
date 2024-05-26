import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { signinAdminDto } from './dto/signin-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Post('/signin')
  async signin(@Body() body: signinAdminDto) {
    const user = await this.adminService.adminLogin(
      body.username,
      body.password,
    );
    return user;
  }

  // Cinemas
  @Get('/allCinemas')
  async findAllCinemas() {
    return await this.adminService.getAllCinemas();
  }

  @Get('/cinema/:id')
  async findCinema(@Param('id') id: string) {
    return await this.adminService.getCinema(parseInt(id));
  }

  @Put('/suspend/cinema/:id')
  async suspendCinema(@Param('id') id: string) {
    return await this.adminService.suspendCinema(parseInt(id));
  }

  @Put('/unsuspend/cinema/:id')
  async unsuspendCinema(@Param('id') id: string) {
    return await this.adminService.unsuspendCinema(parseInt(id));
  }

  @Delete('/delete/cinema/:id')
  async deleteCinema(@Param('id') id: string) {
    return await this.adminService.deleteCinema(parseInt(id));
  }

  // Users
  @Get('/allusers')
  async findAllUsers(@Param('id') id: string) {
    return await this.adminService.getAllUsers();
  }

  @Get('/user/:id')
  async findUser(@Param('id') id: string) {
    return await this.adminService.getUser(parseInt(id));
  }

  @Put('/suspend/user/:id')
  async suspendUser(@Param('id') id: string) {
    return await this.adminService.suspendUser(parseInt(id));
  }

  @Put('/unsuspend/user/:id')
  async unsuspendUser(@Param('id') id: string) {
    return await this.adminService.unsuspendUser(parseInt(id));
  }

  @Delete('/delete/user/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.adminService.deleteUser(parseInt(id));
  }
}
