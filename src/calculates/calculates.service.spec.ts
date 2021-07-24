import { Test, TestingModule } from '@nestjs/testing';
import { CalculatesService } from './calculates.service';

describe('CalculatesService', () => {
  let service: CalculatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatesService],
    }).compile();

    service = module.get<CalculatesService>(CalculatesService);
  });

  describe('Service Create', () => {
    it('should be create', async () => {
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
      const { data } = await service.create(payload);
      expect(data).toEqual(data);
    });
  });

  describe('Position Allowance', () => {
    it('should be positionAllowance 325000', () => {
      const data = service.positionAllowance(6500000, true);
      expect(data).toEqual(325000);
    });
    it('should be positionAllowance 500000', () => {
      const data = service.positionAllowance(16500000, true);
      expect(data).toEqual(500000);
    });
  });

  describe('Calculates JHT and JP', () => {
    it('should be calculatesJht 130000', () => {
      const data = service.calculatesJht(6500000, true);
      expect(data).toEqual(130000);
    });
    it('should be calculatesJp 65000', () => {
      const data = service.calculatesJp(6500000, true);
      expect(data).toEqual(65000);
    });
  });

  describe('Rumus PTKP', () => {
    it('Married, Male and dependant', async () => {
      const payload = {
        isMarried: true,
        isHusband: true,
        dependant: 1,
      };
      const data = await service.rumusPtkp(payload);
      expect(data).toEqual(63000000);
    });
    it('Married and female', async () => {
      const payload = {
        isMarried: true,
        isHusband: false,
      };
      const data = await service.rumusPtkp(payload);
      expect(data).toEqual(54000000);
    });
    it('No Married', async () => {
      const payload = {
        isMarried: false,
        isHusband: false,
      };
      const data = await service.rumusPtkp(payload);
      expect(data).toEqual(54000000);
    });
  });

  describe('Tax Relife', () => {
    it('Tax relife 63.000.000', () => {
      const data = service.dependant(1);
      expect(data).toEqual(63000000);
    });
    it('Tax relife 67.500.000', () => {
      const data = service.dependant(2);
      expect(data).toEqual(67500000);
    });
    it('Tax relife 72.000.000', () => {
      const data = service.dependant(3);
      expect(data).toEqual(72000000);
    });
    it('Tax relife 58.500.000', () => {
      const data = service.dependant(0);
      expect(data).toEqual(58500000);
    });
  });

  describe('NPWP', () => {
    it('No NPWP', () => {
      const data = service.isNpwp(17000, false);
      expect(data).toEqual(20400);
    });
    it('NPWP', () => {
      const data = service.isNpwp(17000, true);
      expect(data).toEqual(17000);
    });
  });
});
