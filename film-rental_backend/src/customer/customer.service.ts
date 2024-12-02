import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

/**
 * CustomerService
 *
 * Handles business logic for the `Customer` entity.
 * Provides methods for CRUD operations and filtering.
 */
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>, // Repository to interact with the database
  ) {}

  /**
   * Create a new customer using a DTO.
   * @param createCustomerDto - Data Transfer Object containing customer details.
   * @returns The created customer entity.
   */
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto); // Converts DTO into an entity
    return await this.customerRepository.save(customer); // Saves the entity in the database
  }

  /**
   * Create or update a customer.
   * Can be used generically without validation.
   * @param customerData - Partial data for creating or updating a customer.
   * @returns The created or updated customer entity.
   */
  async createOrUpdateCustomer(
    customerData: Partial<Customer>,
  ): Promise<Customer> {
    return await this.customerRepository.save(customerData); // Saves or updates customer
  }

  /**
   * Retrieve all customers.
   * @returns An array of all customers.
   */
  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find(); // Fetches all customer records
  }

  /**
   * Retrieve customers with filters applied dynamically.
   * Supports filtering by first name, last name, or email.
   * @param filters - Partial `Customer` object containing filter criteria.
   * @returns An array of customers matching the filters.
   */
  async findWithFilters(filters: Partial<Customer>): Promise<Customer[]> {
    const query = this.customerRepository.createQueryBuilder('customer'); // Creates a query builder for dynamic filtering

    // Adds a filter for first name if provided
    if (filters.firstName) {
      query.andWhere('customer.firstName LIKE :firstName', {
        firstName: `%${filters.firstName}%`,
      });
    }

    // Adds a filter for last name if provided
    if (filters.lastName) {
      query.andWhere('customer.lastName LIKE :lastName', {
        lastName: `%${filters.lastName}%`,
      });
    }

    // Adds a filter for email if provided
    if (filters.email) {
      query.andWhere('customer.email = :email', { email: filters.email });
    }

    return await query.getMany(); // Executes the query and returns the result
  }
}
