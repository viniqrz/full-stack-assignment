import { ApiProperty } from '@nestjs/swagger';
import { IAlbum } from '../interfaces/album.interface';
import { IsNumber, IsString } from 'class-validator';
import { PhotoDto } from '../../photo/dto/photo.dto';

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

  @ApiProperty()
  photos?: PhotoDto[];
}
