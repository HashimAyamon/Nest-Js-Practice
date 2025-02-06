import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('contract')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  async create(@Body() createShiftDto: CreateShiftDto) {
    return await this.shiftService.create(createShiftDto);
  }

  @Get()
  async findAll(@Query('pageSize')pageSize:number,@Query('page')page:number) {
    return await this.shiftService.findAll(pageSize,page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shiftService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return await this.shiftService.update(+id, updateShiftDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shiftService.remove(+id);
  }
}