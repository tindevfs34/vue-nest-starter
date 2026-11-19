// -- NestJS Core --
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// -- Third-party Libraries --
import { Repository } from 'typeorm';

// -- Internal Services & Utilities --

// -- Entities --
import { AuditLog } from '@/modules/audit/entities/audit-log.entity';

@Injectable()
export class AuditService {
  private readonly auditLogRepository: Repository<AuditLog>;

  constructor(
    @InjectRepository(AuditLog)
    repo: Repository<AuditLog>,
  ) {
    this.auditLogRepository = repo;
  }

  async log(data: Partial<AuditLog>): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create(data);
    return this.auditLogRepository.save(auditLog);
  }

  async findAll(): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
