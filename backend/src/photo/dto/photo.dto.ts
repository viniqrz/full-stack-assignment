import { ApiProperty } from '@nestjs/swagger';
import { IPhoto } from '../interfaces/photo.interface';
import { IsNumber } from 'class-validator';

export class PhotoDto implements IPhoto {
  @ApiProperty()
  @IsNumber()
  albumId: number;
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsNumber()
  title: string;
  @ApiProperty()
  @IsNumber()
  url: string;
  @ApiProperty()
  @IsNumber()
  thumbnailUrl: string;
}
