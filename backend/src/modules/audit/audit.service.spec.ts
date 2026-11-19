// -- NestJS Core & Testing --
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// -- Entities & Service --
import { AuditLog } from '@/modules/audit/entities/audit-log.entity';
import { AuditService } from '@/modules/audit/audit.service';

describe('AuditService (3.18 Audit Module Tests)', () => {
  let service: AuditService;
  let repository: jest.Mocked<Repository<AuditLog>>;

  const mockAuditLog: any = {
    id: 'audit-uuid-1',
    userId: 'user-uuid-1',
    action: 'POST_CREATE',
    resource: 'posts',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditService,
        {
          provide: getRepositoryToken(AuditLog),
          useValue: {
            create: jest.fn().mockImplementation((dto) => ({ ...dto })),
            save: jest.fn().mockImplementation((log) => Promise.resolve({ id: 'audit-uuid-1', ...log })),
            find: jest.fn().mockResolvedValue([mockAuditLog]),
          },
        },
      ],
    }).compile();

    service = module.get<AuditService>(AuditService);
    repository = module.get(getRepositoryToken(AuditLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('T-AUDIT-01: Audit LogActivity', () => {
    it('T-AUDIT-01: log creates new audit log record', async () => {
      const dto = { userId: 'user-uuid-1', action: 'POST_CREATE', resource: 'posts' };
      const res = await service.log(dto);
      expect(res.action).toBe('POST_CREATE');
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('T-AUDIT-02 & T-AUDIT-03: Audit FindAll & Filter', () => {
    it('T-AUDIT-02 & T-AUDIT-03: findAll returns list of audit log entries ordered by date', async () => {
      const res = await service.findAll();
      expect(res).toEqual([mockAuditLog]);
      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({ order: { createdAt: 'DESC' } }),
      );
    });
  });
});
