import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity'; // Rental entity
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';

/**
 * RentalModule
 *
 * This module manages the `Rental` feature, including:
 * - Database integration for the `Rental` entity using TypeORM.
 * - Business logic handled by `RentalService`.
 * - HTTP routes and endpoints defined in `RentalController`.
 */
@Module({
  imports: [
    // Register the Rental entity with TypeORM for database operations
    TypeOrmModule.forFeature([Rental]),
  ],
  controllers: [
    // Attach the RentalController to handle HTTP requests
    RentalController,
  ],
  providers: [
    // Register the RentalService to manage business logic
    RentalService,
  ],
})
export class RentalModule {}
