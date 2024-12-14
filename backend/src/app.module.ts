import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { AlbumModule } from './album/album.module';
import { AdaptersModule } from './common/adapters/adapters.module';

@Module({
  imports: [AdaptersModule, UserModule, PhotoModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
