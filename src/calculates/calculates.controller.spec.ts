import { Test } from '@nestjs/testing';
import { CalculatesController } from './calculates.controller';
import { CalculatesService } from './calculates.service';
import { CalculatesModule } from './calculates.module';
import { CreateCalculateDto } from './../calculates/dto/create-calculate.dto';
import { INestApplication } from '@nestjs/common';

describe('CalculatesController', () => {
  let app: INestApplication;
  let calculatesController: CalculatesController;
  let calculatesService: CalculatesService;
  let createCalculateDto: CreateCalculateDto;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CalculatesModule],
    })
      .overrideProvider(CalculatesService)
      .useValue(calculatesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    calculatesService = new CalculatesService();
    createCalculateDto = new CreateCalculateDto();
    calculatesController = new CalculatesController(calculatesService);
  });

  const payload: any = {
    name: 'Jhon Doe',
    salary: 6500000,
    positionAllowance: false,
    jht: false,
    jp: false,
    isMarried: true,
    isHusband: true,
    dependant: 1,
    isNPWP: true,
  };

  it('should return an object of calculates', async () => {
    jest.spyOn(calculatesService, 'create').mockImplementation(() => payload);
    const result = await calculatesController.create(createCalculateDto);
    expect(result).toBe(payload);
  });
});
