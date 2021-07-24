import { Module } from '@nestjs/common';
import { CalculatesService } from './calculates.service';
import { CalculatesController } from './calculates.controller';

@Module({
  controllers: [CalculatesController],
  providers: [CalculatesService],
})
export class CalculatesModule {}
