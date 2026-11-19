// -- NestJS Core & Swagger --
import { ApiProperty } from '@nestjs/swagger';

// -- Third-party Libraries --
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Editor' })
  @IsNotEmpty({ message: 'Tên vai trò không được để trống' })
  @IsString({ message: 'Tên vai trò phải là chuỗi' })
  name: string;

  @ApiProperty({ example: 'Biên tập viên nội dung' })
  @IsNotEmpty({ message: 'Mô tả vai trò không được để trống' })
  @IsString({ message: 'Mô tả vai trò phải là chuỗi' })
  description: string;

  @ApiProperty({
    example: ['perm-uuid-1', 'perm-uuid-2'],
    description: 'Danh sách ID quyền hạn được gán cho vai trò',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Danh sách ID quyền hạn phải là mảng' })
  permissionIds?: string[];
}
