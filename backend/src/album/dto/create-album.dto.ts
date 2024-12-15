import { OmitType } from '@nestjs/swagger';
import { AlbumDto } from './album.dto';

export class CreateAlbumDto extends OmitType(AlbumDto, ['id'] as const) {}
