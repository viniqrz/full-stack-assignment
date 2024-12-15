import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { PhotoDto } from '../photo/dto/photo.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumDto> {
    return this.albumService.create(createAlbumDto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query() withPhotos: boolean,
  ): Promise<AlbumDto> {
    return this.albumService.findOne(+id, withPhotos);
  }

  @Get(':id/photos')
  findAlbumPhotos(@Param('id') id: string): Promise<PhotoDto[]> {
    return this.albumService.findAlbumPhotos(id);
  }

  @Put(':id')
  update(@Body() albumDto: AlbumDto): Promise<AlbumDto> {
    return this.albumService.update(albumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.albumService.remove(+id);
  }
}
