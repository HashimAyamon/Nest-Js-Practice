import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    const { type, start_time, end_time } = createShiftDto;

    if (type === 'Flexible without time constraints') {
      createShiftDto.start_time = null;
      createShiftDto.end_time = null;
    } else if (!start_time || !end_time) {
      throw new BadRequestException(
        'Start and end times are required for Fixed and Flexible shifts.',
      );
    }

    const shift = this.shiftRepository.create(createShiftDto);
    return await this.shiftRepository.save(shift);
  }

  async update(id: number, updateShiftDto: UpdateShiftDto): Promise<Shift> {
    const { type, start_time, end_time } = updateShiftDto;

    if (type === 'Flexible without time constraints') {
      updateShiftDto.start_time = null;
      updateShiftDto.end_time = null;
    } else if (
      (type === 'Fixed' || type === 'Flexible') &&
      (!start_time || !end_time)
    ) {
      throw new BadRequestException(
        'Start and end times are required for Fixed and Flexible shifts.',
      );
    }

    await this.shiftRepository.update(id, updateShiftDto);
    return this.findOne(id);
  }

  async findAll(pageSize: number, page: number): Promise<{ shifts: Shift[]; totalShifts: number }> {
    page = page || 1;
    pageSize = pageSize || 5;
    const recordsToSkip = (page - 1) * pageSize;

    const [shifts, totalShifts] = await this.shiftRepository.findAndCount({
      skip: recordsToSkip,
      take: pageSize,
      order: { id: 'ASC' },
    });

    return { shifts, totalShifts };
  }

  async findOne(id: number): Promise<Shift> {
    const shift = await this.shiftRepository.findOne({ where: { id } });
    if (!shift) {
      throw new BadRequestException(`Shift with ID ${id} not found.`);
    }
    return shift;
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.shiftRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`Shift with ID ${id} not found.`);
    }
    return { message: `Shift with ID ${id} deleted successfully.` };
  }
}
