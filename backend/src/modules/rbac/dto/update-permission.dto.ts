// -- NestJS Core & Swagger --
import { PartialType } from '@nestjs/swagger';

// -- DTOs --
import { CreatePermissionDto } from '@/modules/rbac/dto/create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
