// -- NestJS Core --
import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// -- Internal Services --
import { UsersService } from '@/modules/users/users.service';

// -- Guards, Decorators, Enums & Types --
import { AuthGuard } from '@/common/guards/auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('User Profile')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
