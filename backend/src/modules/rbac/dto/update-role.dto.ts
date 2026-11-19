// -- NestJS Core & Swagger --
import { PartialType } from '@nestjs/swagger';

// -- DTOs --
import { CreateRoleDto } from '@/modules/rbac/dto/create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
