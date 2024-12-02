import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service'; // Import the mail service for email simulation

/**
 * TaskService
 *
 * Handles scheduled tasks and provides manual control for triggering tasks.
 * Includes daily email notifications for rental reminders (J-5 and J-3).
 */
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name); // Logger for tracking task execution

  constructor(private readonly mailService: MailService) {}

  // Tracks the status of each task (e.g., pending, running, failed)
  private taskStatuses: Record<string, string> = {
    'J-5': 'pending', // Status for the J-5 task
    'J-3': 'pending', // Status for the J-3 task
  };

  /**
   * Scheduled task for sending reminders 5 days before the rental return date.
   * Runs daily at 12:00 PM.
   */
  @Cron('0 12 * * *')
  async executeJMinus5() {
    this.logger.log('Executing J-5 task...');
    try {
      // Example customer and rental data (replace with database queries)
      const customerEmail = 'customer@example.com';
      const rentalId = 1;
      const returnDate = '2024-11-27';

      // Simulate sending an email
      await this.mailService.sendEmail(
        customerEmail,
        `Reminder: Rental ID ${rentalId}`,
        `Your rental is due on ${returnDate}. Please return it to avoid late fees.`,
      );

      this.logger.log('Task J-5 executed successfully');
    } catch (error) {
      this.logger.error('Task J-5 failed', error.stack);
    }
  }

  /**
   * Scheduled task for sending reminders 3 days before the rental return date.
   * Runs daily at 12:00 PM.
   */
  @Cron('0 12 * * *')
  async executeJMinus3() {
    this.logger.log('Executing J-3 task...');
    try {
      // Example customer and rental data (replace with database queries)
      const customerEmail = 'customer@example.com';
      const rentalId = 1;
      const returnDate = '2024-11-27';

      // Simulate sending an email
      await this.mailService.sendEmail(
        customerEmail,
        `Reminder: Rental ID ${rentalId}`,
        `Your rental is due on ${returnDate}. Please return it to avoid late fees.`,
      );

      this.logger.log('Task J-3 executed successfully');
    } catch (error) {
      this.logger.error('Task J-3 failed', error.stack);
    }
  }

  /**
   * Manually triggers a specific task by name.
   * @param taskName - The name of the task to trigger (e.g., 'J-5', 'J-3').
   * @returns A success message indicating the task was triggered.
   * @throws NotFoundException if the task name is invalid.
   */
  async triggerTask(taskName: string): Promise<string> {
    if (!this.taskStatuses[taskName]) {
      throw new NotFoundException(`Task ${taskName} not found`);
    }

    this.logger.log(`Triggering task ${taskName} manually`);
    this.taskStatuses[taskName] = 'running'; // Update task status to "running"

    try {
      if (taskName === 'J-5') {
        await this.executeJMinus5();
      } else if (taskName === 'J-3') {
        await this.executeJMinus3();
      }
      this.taskStatuses[taskName] = 'completed'; // Update task status to "completed"
      return `Task ${taskName} triggered successfully`;
    } catch (error) {
      this.taskStatuses[taskName] = 'failed'; // Update task status to "failed"
      throw error;
    }
  }

  /**
   * Lists the status of all scheduled tasks.
   * @returns An object mapping task names to their current statuses.
   */
  listTasks(): Record<string, string> {
    return this.taskStatuses;
  }

  /**
   * Retrieves the current status of a specific task.
   * @param taskName - The name of the task to check.
   * @returns The current status of the task (e.g., 'pending', 'running', 'completed').
   * @throws NotFoundException if the task name is invalid.
   */
  getTaskStatus(taskName: string): string {
    const status = this.taskStatuses[taskName];
    if (!status) {
      throw new NotFoundException(`Task ${taskName} not found`);
    }
    return status;
  }
}
