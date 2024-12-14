import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsNumber()
  name: string;
  @ApiProperty()
  @IsNumber()
  username: string;
  @ApiProperty()
  @IsNumber()
  email: string;
}
