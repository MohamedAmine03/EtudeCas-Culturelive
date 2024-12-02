import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MailService } from '../mail/mail.service'; // Import MailService for email simulation

/**
 * TaskModule
 *
 * Manages task scheduling, execution, and manual control.
 * Integrates `TaskService` for task logic and `MailService` for email simulation.
 */
@Module({
  imports: [
    // Enables scheduling functionality in the application
    ScheduleModule.forRoot(),
  ],
  controllers: [
    // Handles HTTP requests for task-related actions
    TaskController,
  ],
  providers: [
    // Handles business logic for tasks
    TaskService,
    // Provides email simulation functionality
    MailService,
  ],
})
export class TaskModule {}
