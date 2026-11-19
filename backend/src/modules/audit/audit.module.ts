// -- NestJS Core --
import { Module } from '@nestjs/common';

// -- Third-party Libraries --
import { TypeOrmModule } from '@nestjs/typeorm';

// -- Internal Modules & Services --
import { AuthModule } from '@/modules/auth/auth.module';
import { AuditService } from '@/modules/audit/audit.service';

// -- Controllers --
import { AuditController } from '@/modules/audit/audit.controller';

// -- Entities --
import { AuditLog } from '@/modules/audit/entities/audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog]), AuthModule],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
