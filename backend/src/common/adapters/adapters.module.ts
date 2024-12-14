import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { JsonPlaceholderAdapter } from './json-placeholder.adapter';

@Global()
@Module({
  imports: [HttpModule],
  providers: [JsonPlaceholderAdapter],
  exports: [JsonPlaceholderAdapter],
})
export class AdaptersModule {}
