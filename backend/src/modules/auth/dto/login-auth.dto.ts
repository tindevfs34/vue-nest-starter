import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiPropertyOptional({
    description: 'Email người dùng',
    example: 'superadmin@topreview.vn',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    description: 'Username (nếu có)',
    example: 'superadmin',
  })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({
    description: 'Mật khẩu',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
