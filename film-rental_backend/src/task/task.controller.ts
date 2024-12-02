import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { TaskService } from './task.service';

/**
 * TaskController
 *
 * Handles HTTP endpoints for managing scheduled tasks.
 * Provides functionalities to list tasks, check their statuses, and trigger them manually.
 */
@ApiTags('Tasks') // Groups all endpoints under the "Tasks" category in Swagger
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Lists all scheduled tasks and their statuses.
   * @returns A record object containing task names and their current statuses.
   */
  @Get()
  @ApiOperation({ summary: 'List all scheduled tasks' }) // Summary for Swagger
  @ApiResponse({
    status: 200,
    description: 'List of all scheduled tasks.',
    schema: {
      type: 'object',
      additionalProperties: { type: 'string' }, // Maps task names to their statuses
    },
  })
  listAllTasks(): Record<string, string> {
    return this.taskService.listTasks(); // Returns all task statuses
  }

  /**
   * Retrieves the status of a specific task by name.
   * @param taskName - The name of the task to check.
   * @returns The status of the specified task.
   */
  @Get('/status/:taskName')
  @ApiOperation({ summary: 'Get the status of a scheduled task' }) // Swagger summary
  @ApiParam({
    name: 'taskName',
    type: String,
    description: 'Name of the task to check', // Example: J-5 or J-3
  })
  @ApiResponse({
    status: 200,
    description: 'Status of the task.',
    type: 'string',
  })
  getTaskStatus(@Param('taskName') taskName: string): string {
    return this.taskService.getTaskStatus(taskName); // Fetch the status from TaskService
  }

  /**
   * Manually triggers a specific task by name.
   * @param taskName - The name of the task to trigger.
   * @returns A confirmation message that the task was triggered.
   */
  @Post('/trigger')
  @ApiOperation({ summary: 'Manually trigger a scheduled task' }) // Swagger summary
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        taskName: { type: 'string', example: 'J-5' }, // Example task name
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Confirmation of the task being triggered.',
    type: 'string',
  })
  async triggerTask(@Body('taskName') taskName: string): Promise<string> {
    return await this.taskService.triggerTask(taskName); // Triggers the task via TaskService
  }
}
