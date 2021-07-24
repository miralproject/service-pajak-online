import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCalculateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  salary: number;

  @IsNotEmpty()
  @IsBoolean()
  positionAllowance: boolean;

  @IsNotEmpty()
  @IsBoolean()
  jht: boolean;

  @IsNotEmpty()
  @IsBoolean()
  jp: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isMarried: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isHusband: boolean;

  @IsNotEmpty()
  @IsInt()
  dependant: number;

  @IsNotEmpty()
  @IsBoolean()
  isNPWP: boolean;
}
