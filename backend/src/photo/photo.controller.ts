import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoDto } from './dto/photo.dto';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  create(@Body() createPhotoDto: PhotoDto): Promise<PhotoDto> {
    return this.photoService.create(createPhotoDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() PhotoDto: PhotoDto,
  ): Promise<PhotoDto> {
    return this.photoService.update(PhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.photoService.remove(+id);
  }
}
