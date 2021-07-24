import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatesModule } from './calculates/calculates.module';

@Module({
  imports: [CalculatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
