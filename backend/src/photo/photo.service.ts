import { Injectable } from '@nestjs/common';
import { JsonPlaceholderAdapter } from '../common/adapters/json-placeholder.adapter';
import { PhotoDto } from './dto/photo.dto';
import { PhotoMapper } from './mappers/photo.mapper';

@Injectable()
export class PhotoService {
  constructor(
    private readonly jsonPlaceholderAdapter: JsonPlaceholderAdapter,
  ) {}

  async create(createPhotoDto: PhotoDto) {
    return PhotoMapper.toDto(
      await this.jsonPlaceholderAdapter.createPhoto(
        PhotoMapper.fromDto(createPhotoDto),
      ),
    );
  }

  async findAllByAlbumId(albumId: string) {
    return PhotoMapper.toDtoList(
      await this.jsonPlaceholderAdapter.getPhotosByAlbum(albumId),
    );
  }

  async update(updatePhotoDto: PhotoDto) {
    return PhotoMapper.toDto(
      await this.jsonPlaceholderAdapter.updatePhoto(
        PhotoMapper.fromDto(updatePhotoDto),
      ),
    );
  }

  async remove(id: number) {
    return this.jsonPlaceholderAdapter.deletePhoto(id);
  }
}
