import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto, Empty, StreamRequest, UpdateUserDto } from '@app/common';
import { GeneralService } from './general.service';

@Controller('general')
export class GeneralController {

  constructor(private readonly generalService: GeneralService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.generalService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.generalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.generalService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalService.remove(id);
  }

  @Post('email')
  emailUsers() {
    return this.generalService.emailUsers();

  }

  @Post(`streaming`)
  streaming(StreamRequest: Empty) {
    return this.generalService.streaming(StreamRequest);
  }

  @Post(`stream`)
  stream(@Body() streamRequest: StreamRequest) {
    return this.generalService.stream(streamRequest);
  }


}