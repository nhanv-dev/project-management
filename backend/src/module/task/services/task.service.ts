import { Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/module/common/base.abstract.service';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskService extends BaseServiceAbstract<Task> {
  constructor(private readonly taskRepository: TaskRepository) {
    super(taskRepository);
  }

  async findOneByOwner(id: string, userId: string) {
    return this.taskRepository.findOneByCondition({
      id: id,
      owner: userId,
      deletedAt: null,
    });
  }
}
