import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateShiftDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  start_time?: string;

  @IsOptional()
  end_time?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsIn(['Flexible', 'Fixed', 'Flexible without time constraints'])
  type?: string;
}
