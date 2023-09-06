import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoPermissionException } from 'src/exception/NoPermissionException.exception';
import { NotFoundDataException } from 'src/exception/NotFoundDataException.exception';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { UpdateTopicDto } from '../dtos/update-topic.dto';
import { TopicService } from '../services/topic.service';

@UseGuards(AuthGuard('jwt'))
@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) { }

  @Post()
  async create(@Request() req: any, @Body() createTopicDto: CreateTopicDto) {
    createTopicDto.author = req.user.id;
    return this.topicService.createTopic(createTopicDto);
  }

  @Put(':id')
  async update(@Request() req: any, @Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicService.findOne(id);
    if (!topic) throw new NotFoundDataException();
    if (topic.author.toString() !== req.user.id) throw new NoPermissionException();
    return this.topicService.updateTopic(id, updateTopicDto);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string) {
    const topic = await this.topicService.findOne(id);
    if (!topic) throw new NotFoundDataException();
    if (topic.author.toString() !== req.user.id) throw new NoPermissionException();
    return this.topicService.deleteTopic(id);
  }

  @Get()
  async findAll(@Request() req: any, @Query() queryParams: any) {
    queryParams = { ...queryParams, author: req.user.id };
    return this.topicService.findAllWithoutContent(queryParams);
  }

  @Get(':id/children')
  async findByParent(@Request() req: any, @Param('id') parent: string) {
    return this.topicService.findByParent(parent, req.user.id);
  }

  @Get('children')
  async findByRoot(@Request() req: any) {
    return this.topicService.findByParent(null, req.user.id);
  }

  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.topicService.findDetailTopic(id, req.user.id);
  }
}