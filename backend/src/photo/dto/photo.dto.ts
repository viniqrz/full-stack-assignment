import { ApiProperty } from '@nestjs/swagger';
import { IPhoto } from '../interfaces/photo.interface';
import { IsNumber, IsString } from 'class-validator';

export class PhotoDto implements IPhoto {
  @ApiProperty()
  @IsNumber()
  albumId: number;
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  url: string;
  @ApiProperty()
  @IsString()
  thumbnailUrl: string;
}
