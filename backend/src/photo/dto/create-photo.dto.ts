import { OmitType } from '@nestjs/swagger';
import { PhotoDto } from './photo.dto';

export class CreatePhotoDto extends OmitType(PhotoDto, ['id'] as const) {}
