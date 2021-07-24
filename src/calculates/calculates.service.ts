import { Injectable } from '@nestjs/common';
import { CreateCalculateDto } from './dto/create-calculate.dto';

@Injectable()
export class CalculatesService {
  async create(payload: CreateCalculateDto) {
    const {
      name,
      salary,
      positionAllowance,
      jht,
      jp,
      isMarried,
      isHusband,
      isNPWP,
      dependant,
    } = payload;
    const pa = this.positionAllowance(salary, positionAllowance);
    const calculatesJht = this.calculatesJht(salary, jht);
    const calculatesJp = this.calculatesJp(salary, jp);
    const subtraction = pa + calculatesJht + calculatesJp;
    const netIncomeMonth = salary - subtraction;
    const annualNetIncome = netIncomeMonth * 12;
    const taxRelief = await this.rumusPtkp({ isMarried, isHusband, dependant });
    const annualTaxableIncome = annualNetIncome - taxRelief;
    const pphToBePaid = (annualTaxableIncome * 5) / 100;
    const pph = pphToBePaid / 12;
    const pph21 = this.isNpwp(pph, isNPWP);

    const result: any = {
      name,
      salary: salary,
      isPositionAllowance: positionAllowance,
      positionAllowance: pa,
      isJHT: jht,
      jht: calculatesJht,
      isJp: jp,
      jp: calculatesJp,
      totalBruto: subtraction,
      isMarried,
      isHusband,
      isNPWP,
      dependant,
      netIncomeMonth: netIncomeMonth,
      annualNetIncome: annualNetIncome,
      taxRelief,
      annualTaxableIncome: annualTaxableIncome,
      pphToBePaid: pphToBePaid,
      pph21: pph21,
    };
    return { data: result };
  }

  /*
    Rumus biaya jabatan nominal bruto * 5% or maksimal Rp.500.000
  */
  positionAllowance(nominal: number, allowance: boolean) {
    let positionAllowance = 0;
    if (allowance) {
      const bruto = (nominal * 5) / 100;
      positionAllowance = bruto >= 500000 ? 500000 : bruto;
    }
    return positionAllowance;
  }

  /*
    Iuran Jaminan Hari Tua (JHT), 2% dari gaji pokok
  */
  calculatesJht(salary: number, jht: boolean) {
    return jht ? (salary * 2) / 100 : 0;
  }

  /*
    (iv) Jaminan Pensiun (JP), 1% dari gaji pokok
  */
  calculatesJp(salary: number, jp: boolean) {
    return jp ? (salary * 1) / 100 : 0;
  }

  /*
    Tax reliefs are based on the person’s profile
  */
  async rumusPtkp(payload) {
    let nominal;
    if (payload.isMarried && payload.isHusband) {
      nominal = await this.dependant(payload.dependant);
    } else if (payload.isMarried && !payload.isHusband) {
      nominal = 54000000;
    } else {
      nominal = 54000000;
    }
    return nominal;
  }

  dependant(dependant) {
    let ptkp;
    switch (dependant) {
      case 1:
        ptkp = 63000000;
        break;
      case 2:
        ptkp = 67500000;
        break;
      case 3:
        ptkp = 72000000;
        break;
      default:
        ptkp = 58500000;
        break;
    }
    return ptkp;
  }

  /*
    Jika wajib pajak tidak memiliki NPWP, maka PPh 21 perlu dikalikan 120%, 
    contoh : PPh 21 sebesar = Rp 70.167, maka terutangnya menjadi Rp 70.167 x 120% = Rp 84.201.
  */
  isNpwp(pph21, npwp) {
    if (!npwp) {
      return (parseInt(pph21) * 120) / 100;
    }
    return pph21;
  }
}
