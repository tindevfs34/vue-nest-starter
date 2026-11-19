// -- NestJS Core --
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// -- Guards & Decorators --
import { AuthGuard } from '@/common/guards/auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

@ApiTags('RBAC Management')
@ApiBearerAuth()
@Controller('rbac')
@UseGuards(AuthGuard, RolesGuard)
export class RbacController {}
