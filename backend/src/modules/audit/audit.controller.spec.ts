// -- NestJS Core & Testing --
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

// -- Guards & Decorators --
import { AuthGuard } from '@/common/guards/auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { AuthService } from '@/modules/auth/auth.service';

// -- Controller & Service --
import { AuditController } from '@/modules/audit/audit.controller';
import { AuditService } from '@/modules/audit/audit.service';

describe('AuditController (3.18 Audit Module Tests)', () => {
  let controller: AuditController;
  let serviceMock: jest.Mocked<AuditService>;

  const mockAuditLog = {
    id: 'audit-uuid-1',
    action: 'POST_CREATE',
  };

  beforeEach(async () => {
    serviceMock = {
      log: jest.fn().mockResolvedValue(mockAuditLog),
      findAll: jest.fn().mockResolvedValue([mockAuditLog]),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditController],
      providers: [
        {
          provide: AuditService,
          useValue: serviceMock,
        },
        {
          provide: JwtService,
          useValue: { verifyAsync: jest.fn(), decode: jest.fn() },
        },
        {
          provide: AuthService,
          useValue: { validateSession: jest.fn() },
        },
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn().mockReturnValue(true) },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuditController>(AuditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Endpoints delegation', () => {
    it('should delegate findAll to service.findAll', async () => {
      const res = await controller.findAll();
      expect(serviceMock.findAll).toHaveBeenCalled();
      expect(res).toEqual([mockAuditLog]);
    });
  });
});
