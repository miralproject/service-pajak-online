import { Controller, Post, Body } from '@nestjs/common';
import { CalculatesService } from './calculates.service';
import { CreateCalculateDto } from './dto/create-calculate.dto';

@Controller('calculates')
export class CalculatesController {
  constructor(private readonly calculatesService: CalculatesService) {}

  @Post()
  create(@Body() createCalculateDto: CreateCalculateDto) {
    return this.calculatesService.create(createCalculateDto);
  }
}
