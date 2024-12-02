import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { RentalModule } from './rental/rental.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { FilmModule } from './film/film.module';
import { ConfigModule } from '@nestjs/config';
import { TestMailModule } from './test-mail/test-mail.module';

/**
 * AppModule
 *
 * Root module for the application. Registers all feature modules and core configurations.
 */
@Module({
  imports: [
    // Enables task scheduling functionalities (e.g., cron jobs)
    ScheduleModule.forRoot(),

    // Loads environment variables from a .env file into process.env
    ConfigModule.forRoot(),

    // Configures TypeORM for database connections
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: process.env.DATABASE_HOST || 'localhost', // Database host
      port: +process.env.DATABASE_PORT || 5432, // Database port
      username: process.env.DATABASE_USERNAME || 'postgres', // Database username
      password: process.env.DATABASE_PASSWORD || 'postgres', // Database password
      database: process.env.DATABASE_NAME || 'sakila', // Database name
      autoLoadEntities: true, // Automatically load entities without manual import
      synchronize: false, // Should only be true in development to auto-sync schema
      logging: ['query', 'error'], // Log SQL queries and errors
    }),

    // Feature modules
    CustomerModule, // Handles customer-related functionality
    RentalModule, // Handles rental-related functionality
    TaskModule, // Handles scheduled tasks (e.g., reminders)
    FilmModule, // Handles film-related functionality
    TestMailModule, // Handles simulated email testing
  ],
  controllers: [
    AppController, // Global controller for application-specific endpoints
  ],
  providers: [
    AppService, // Global service for shared business logic
  ],
})
export class AppModule {}
