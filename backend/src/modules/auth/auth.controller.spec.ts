// -- NestJS Core & Testing --
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// -- Third-party Libraries --
import { JwtService } from '@nestjs/jwt';

// -- Internal Services --
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';

// -- Types, Constants & Enums --
import { RoleEnum } from '@/common/enums/role.enum';
import {
  AuthenticatedRequest,
  LoginResponse,
} from '@/modules/auth/types/auth.types';

// -- Guards & Strategies --
import { AuthGuard } from '@/common/guards/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authServiceMock: any;
  let usersServiceMock: any;
  let jwtServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(),
      refreshToken: jest.fn(),
      logout: jest.fn(),
      getProfile: jest.fn(),
    };
    usersServiceMock = {
      getProfile: jest.fn(),
      updateProfile: jest.fn(),
      uploadAvatar: jest.fn(),
    };
    jwtServiceMock = {
      sign: jest.fn(),
      verifyAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('T-AUTH-C01: API POST /auth/admin/login — Response 200 + Token', () => {
    it('should return 200 OK with access token when login requested', async () => {
      const mockRequest = {
        user: {
          id: 'user-123',
          email: 'admin@example.com',
          role: { name: RoleEnum.Admin },
          isActive: true,
          isSuperAdmin: false,
        },
      } as AuthenticatedRequest;

      const mockResponse: LoginResponse = {
        info: mockRequest.user as any,
        accessToken: 'jwt.token.mock.123',
      };

      authServiceMock.login.mockResolvedValue(mockResponse);

      const result = await controller.loginAdmin(mockRequest);

      expect(result).toEqual(mockResponse);
      expect(authServiceMock.login).toHaveBeenCalledWith(
        mockRequest.user,
        expect.any(Object),
      );
    });
  });

  describe('T-AUTH-C02: API POST /auth/admin/login — Validation Fail (400 Bad Request)', () => {
    it('should throw BadRequestException when request payload validation fails', async () => {
      authServiceMock.login.mockRejectedValue(
        new BadRequestException('Validation failed'),
      );

      const mockInvalidReq = { user: null } as any;

      await expect(controller.loginAdmin(mockInvalidReq)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('T-AUTH-C03: API POST /auth/refresh — Cấp lại Access Token', () => {
    it('should return new access token on valid refresh token body', async () => {
      authServiceMock.refreshToken.mockResolvedValue({
        accessToken: 'new.access.token',
        refreshToken: 'valid.refresh.token',
      });

      const result = await controller.refreshToken({
        refreshToken: 'valid.refresh.token',
      });

      expect(result).toEqual({
        accessToken: 'new.access.token',
        refreshToken: 'valid.refresh.token',
      });
      expect(authServiceMock.refreshToken).toHaveBeenCalledWith({
        refreshToken: 'valid.refresh.token',
      });
    });
  });

  describe('T-AUTH-C04: API POST /auth/logout — Đăng xuất thành công', () => {
    it('should revoke session and return success message', async () => {
      const mockReq = { user: { id: 'user-123' } } as AuthenticatedRequest;
      authServiceMock.logout.mockResolvedValue({ message: 'Đăng xuất thành công' });

      const result = await controller.logout(mockReq, 'sample.refresh.token');

      expect(result).toEqual({ message: 'Đăng xuất thành công' });
      expect(authServiceMock.logout).toHaveBeenCalledWith('user-123', 'sample.refresh.token');
    });
  });
});
