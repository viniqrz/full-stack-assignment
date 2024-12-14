import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AlbumDto } from '../album/dto/album.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id/albums')
  findUserAlbums(@Param('id') id: string): Promise<AlbumDto[]> {
    return this.userService.findUserAlbums(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(+id);
  }
}
