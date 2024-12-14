import { Injectable } from '@nestjs/common';
import { JsonPlaceholderAdapter } from '../common/adapters/json-placeholder.adapter';
import { UserMapper } from './mappers/user.mapper';
import { AlbumService } from '../album/album.service';

@Injectable()
export class UserService {
  constructor(
    private readonly jsonPlaceholderAdapter: JsonPlaceholderAdapter,
    private readonly albumService: AlbumService,
  ) {}

  async findAll() {
    return UserMapper.toDtoList(await this.jsonPlaceholderAdapter.getUsers());
  }

  async findUserAlbums(userId: string) {
    return this.albumService.findAllByUserId(userId);
  }

  async findOne(id: number) {
    return this.jsonPlaceholderAdapter.getOneUser(id);
  }
}
