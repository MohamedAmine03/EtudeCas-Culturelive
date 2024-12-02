import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

/**
 * CustomerModule
 *
 * This module manages the `Customer` feature, including the controller, service,
 * and integration with the database using TypeORM.
 */
@Module({
  imports: [
    // Registers the Customer entity with TypeORM to enable database interactions
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [
    // Registers the CustomerController to handle HTTP requests
    CustomerController,
  ],
  providers: [
    // Registers the CustomerService to handle business logic
    CustomerService,
  ],
})
export class CustomerModule {}
