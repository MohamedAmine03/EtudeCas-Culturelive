import { Injectable, Logger } from '@nestjs/common';

/**
 * MailService
 *
 * Simulates the process of sending emails.
 * Logs the details of the email instead of actually sending it.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name); // Logger for tracking email activity

  /**
   * Simulates sending an email by logging the details.
   * @param to - The recipient's email address.
   * @param subject - The subject of the email.
   * @param body - The body/content of the email.
   */
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Log the email details to simulate sending
    this.logger.log(`Sending email to: ${to}`); // Log recipient
    this.logger.log(`Subject: ${subject}`); // Log subject
    this.logger.log(`Body: ${body}`); // Log body content
  }
}
