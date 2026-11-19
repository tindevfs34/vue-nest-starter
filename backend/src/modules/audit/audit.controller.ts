// -- NestJS Core --
import { Controller, Get, UseGuards } from '@nestjs/common';

// -- Internal Services --
import { AuditService } from '@/modules/audit/audit.service';

// -- Guards & Decorators --
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleEnum } from '@/common/enums/role.enum';
import { AuthGuard } from '@/common/guards/auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

@Controller('audit-logs')
@UseGuards(AuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Roles(RoleEnum.SuperAdmin, RoleEnum.Admin)
  findAll() {
    return this.auditService.findAll();
  }
}
