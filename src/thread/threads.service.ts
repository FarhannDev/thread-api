import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Thread } from './schemas/thread.schema';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { LikeThreadDto } from './dto/like-thread.dto';

@Injectable()
export class ThreadsService {
  constructor(
    @InjectModel(Thread.name) private readonly threadModel: Model<Thread>,
  ) {}

  async create(createThreadDto: CreateThreadDto): Promise<Thread> {
    const newThread = new this.threadModel(createThreadDto);
    return newThread.save();
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Thread[]> {
    return this.threadModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findById(id: string): Promise<Thread> {
    const thread = await this.threadModel.findById(id).exec();
    if (!thread) throw new NotFoundException('Thread not found');
    return thread;
  }

  async update(id: string, updateThreadDto: UpdateThreadDto): Promise<Thread> {
    const updatedThread = await this.threadModel
      .findByIdAndUpdate(id, updateThreadDto, {
        new: true,
      })
      .exec();

    if (!updatedThread) throw new NotFoundException('Thread not found');
    return updatedThread;
  }

  async delete(id: string): Promise<void> {
    const result = await this.threadModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Thread not found');
  }

  async like(id: string, likeThreadDto: LikeThreadDto): Promise<Thread> {
    const thread = await this.threadModel.findById(id).exec();
    if (!thread) throw new NotFoundException('Thread not found');

    thread.likes.push(likeThreadDto.userId);
    return thread.save();
  }
}
