import { AlbumDto } from '../dto/album.dto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';

export class AlbumMapper {
  static fromDto(albumDto: AlbumDto | CreateAlbumDto) {
    const album = new Album();
    if ('id' in albumDto) {
      album.id = albumDto.id;
    }
    album.title = albumDto.title;
    album.userId = albumDto.userId;
    return album;
  }

  static toDto(album: Album) {
    const albumDto = new AlbumDto();
    albumDto.id = album.id;
    albumDto.title = album.title;
    albumDto.userId = album.userId;
    return albumDto;
  }

  static toDtoList(albums: Album[]): AlbumDto[] {
    return albums.map((album) => AlbumMapper.toDto(album));
  }
}
