import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateShiftDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  start_time: string;

  @IsOptional()
  end_time: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsIn(['Flexible', 'Fixed', 'Flexible without time constraints'])
  type: string;
}
