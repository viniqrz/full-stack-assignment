import { CreatePhotoDto } from '../dto/create-photo.dto';
import { PhotoDto } from '../dto/photo.dto';
import { Photo } from '../entities/photo.entity';

export class PhotoMapper {
  static fromDto(photoDto: PhotoDto | CreatePhotoDto) {
    const photo = new Photo();
    if ('id' in photoDto) {
      photo.id = photoDto.id;
    }
    photo.albumId = photoDto.albumId;
    photo.title = photoDto.title;
    photo.url = photoDto.url;
    photo.thumbnailUrl = photoDto.thumbnailUrl;
    return photo;
  }

  static toDto(photo: Photo) {
    const photoDto = new PhotoDto();
    photoDto.albumId = photo.albumId;
    photoDto.id = photo.id;
    photoDto.title = photo.title;
    photoDto.url = photo.url;
    photoDto.thumbnailUrl = photo.thumbnailUrl;
    return photoDto;
  }

  static toDtoList(photos: Photo[]): PhotoDto[] {
    return photos.map((photo) => PhotoMapper.toDto(photo));
  }
}
