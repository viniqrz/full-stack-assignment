import { Injectable } from '@nestjs/common';
import { JsonPlaceholderAdapter } from '../common/adapters/json-placeholder.adapter';
import { AlbumDto } from './dto/album.dto';
import { PhotoService } from '../photo/photo.service';
import { AlbumMapper } from './mappers/album.mapper';
import { PhotoMapper } from '../photo/mappers/photo.mapper';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly jsonPlaceholderAdapter: JsonPlaceholderAdapter,
    private readonly photoService: PhotoService,
  ) {}

  async create(albumDto: CreateAlbumDto) {
    return AlbumMapper.toDto(
      await this.jsonPlaceholderAdapter.createAlbum(
        AlbumMapper.fromDto(albumDto),
      ),
    );
  }
  async findAllByUserId(userId: string) {
    const albums = await this.jsonPlaceholderAdapter.getAlbumsByUser(userId);
    return AlbumMapper.toDtoList(albums);
  }

  async findAlbumPhotos(albumId: string) {
    const photos = await this.photoService.findAllByAlbumId(+albumId);
    return PhotoMapper.toDtoList(photos);
  }

  async findOne(id: number, withPhotos = false) {
    const album = await this.jsonPlaceholderAdapter.getAlbum(id);
    const albumDto = AlbumMapper.toDto(album);
    if (withPhotos) {
      albumDto.photos = await this.photoService.findAllByAlbumId(album.id);
    }
    return albumDto;
  }

  async update(updateAlbumDto: AlbumDto) {
    const updatedAlbum = await this.jsonPlaceholderAdapter.updateAlbum(
      AlbumMapper.fromDto(updateAlbumDto),
    );
    return AlbumMapper.toDto(updatedAlbum);
  }

  async remove(id: number) {
    await this.jsonPlaceholderAdapter.deleteAlbum(id);
  }
}
