import { Module } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { TestMailController } from './test-mail.controller';

/**
 * TestMailModule
 *
 * This module provides a testing environment for the MailService.
 * It includes a controller to simulate email sending and a MailService to handle the email logic.
 */
@Module({
  controllers: [
    // Defines the TestMailController to handle email testing endpoints
    TestMailController,
  ],
  providers: [
    // Provides the MailService to simulate email functionality
    MailService,
  ],
})
export class TestMailModule {}
