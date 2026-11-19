import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({
    description: 'Username',
    example: 'triqn',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'Nickname',
    example: 'Trí QN',
  })
  @IsNotEmpty()
  @IsString()
  nickName: string;

  @ApiProperty({
    description: 'Email',
    example: 'superadmin@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'SuperAdmin@123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
