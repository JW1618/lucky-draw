import { Module } from '@nestjs/common';
import { DrawModule } from './draw/draw.module';

@Module({
  imports: [DrawModule],
})
export class AppModule {}
