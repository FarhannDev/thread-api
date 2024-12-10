import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { LikeThreadDto } from './dto/like-thread.dto';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  async createThread(@Body() createThreadDto: CreateThreadDto) {
    return this.threadsService.create(createThreadDto);
  }

  @Get()
  async getThreads(@Query('page') page: number, @Query('limit') limit: number) {
    return this.threadsService.findAll(page, limit);
  }

  @Get(':id')
  async getThreadById(@Param('id') id: string) {
    return this.threadsService.findById(id);
  }

  @Put(':id')
  async updateThread(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto,
  ) {
    return this.threadsService.update(id, updateThreadDto);
  }

  @Delete(':id')
  async deleteThread(@Param('id') id: string) {
    return this.threadsService.delete(id);
  }

  @Post(':id/like')
  async likeThread(
    @Param('id') id: string,
    @Body() likeThreadDto: LikeThreadDto,
  ) {
    return this.threadsService.like(id, likeThreadDto);
  }
}
