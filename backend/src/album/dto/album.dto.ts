import { ApiProperty } from '@nestjs/swagger';
import { IAlbum } from '../interfaces/album.interface';
import { IsNumber, IsString } from 'class-validator';

export class AlbumDto implements IAlbum {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;
}
