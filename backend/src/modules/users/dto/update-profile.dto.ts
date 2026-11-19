import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Nguyễn Văn A', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: '0987654321', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 'ABC Corp', required: false })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({
    example: 'https://cdn.topreview.vn/avatars/user-uuid-123.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ example: 'newSuperAdmin@123', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}

