// -- NestJS Core & Swagger --
import { ApiProperty } from '@nestjs/swagger';

// -- Third-party Libraries --
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'posts:create' })
  @IsNotEmpty({ message: 'Tên quyền hạn không được để trống' })
  @IsString({ message: 'Tên quyền hạn phải là chuỗi' })
  name: string;

  @ApiProperty({ example: 'Quyền tạo bài viết' })
  @IsNotEmpty({ message: 'Mô tả quyền hạn không được để trống' })
  @IsString({ message: 'Mô tả quyền hạn phải là chuỗi' })
  description: string;
}
