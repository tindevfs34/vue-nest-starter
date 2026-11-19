// -- NestJS Core --
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// -- Third-party Libraries --
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

// -- Internal Services --
import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';

// -- DTOs & Entities --
import { LoginAuthDto } from '@/modules/auth/dto/login-auth.dto';
import { RefreshTokenDto } from '@/modules/auth/dto/refresh-token.dto';

// -- Types & Interfaces --
import {
  AuthenticatedRequest,
  LoginResponse,
  RefreshResponse,
} from '@/modules/auth/types/auth.types';

// -- Guards & Interceptors --
import { AuthGuard } from '@/common/guards/auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(PassportAuthGuard('local-admin'))
  @Post('admin/login')
  @ApiOperation({
    summary: 'Login admin',
    description: 'Login to get access token.',
  })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful.',
  })
  loginAdmin(@Request() req: AuthenticatedRequest): Promise<LoginResponse> {
    const userAgent = req.headers?.['user-agent'] as string | undefined;
    const ipAddress =
      req.ip || (req.socket?.remoteAddress as string | undefined);
    return this.authService.login(req.user, { userAgent, ipAddress });
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Cấp mới Access Token bằng Refresh Token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Refresh token thành công' })
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Đăng xuất khỏi hệ thống' })
  logout(
    @Request() req: AuthenticatedRequest,
    @Body('refreshToken') refreshToken?: string,
  ): Promise<{ message: string }> {
    return this.authService.logout(req.user.id, refreshToken);
  }
}
