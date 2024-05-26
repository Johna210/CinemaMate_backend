import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { CinemasModule } from 'src/cinemas/cinemas.module';
import { UsersService } from 'src/users/users.service';
import { CinemasService } from 'src/cinemas/cinemas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UserauthModule } from 'src/auth/userauth/userauth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    UsersModule,
    CinemasModule,
    UserauthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, UsersService, CinemasService],
})
export class AdminModule {}
