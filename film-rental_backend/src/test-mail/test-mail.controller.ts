import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MailService } from '../mail/mail.service';

/**
 * TestMailController
 *
 * Provides an endpoint to test the MailService.
 * Simulates sending an email by logging its details.
 */
@ApiTags('Test-Mail') // Groups the endpoint under "Test-Mail" in Swagger
@Controller('test-mail')
export class TestMailController {
  constructor(private readonly mailService: MailService) {}

  /**
   * Sends a test email.
   * The email details are logged instead of being actually sent.
   * @returns A success message indicating the log has been generated.
   */
  @Get()
  @ApiOperation({ summary: 'Send a test email (logs email)' }) // Summary for Swagger documentation
  @ApiResponse({
    status: 200,
    description: 'A test email log has been generated.',
    type: 'string', // Response type
  })
  async sendTestEmail(): Promise<string> {
    // Simulate sending an email using MailService
    await this.mailService.sendEmail(
      'test@example.com', // Recipient email
      'Test Email', // Subject of the email
      'This is a test email from your application.', // Body content
    );
    return 'Email log generated successfully.'; // Success response
  }
}
