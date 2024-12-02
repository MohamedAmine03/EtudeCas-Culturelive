/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';

/**
 * RentalService
 * 
 * Handles business logic for the `Rental` entity, including creation,
 * updating, retrieval, and filtering of rentals.
 */
@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>, // Repository for Rental entity
  ) {}

  /**
   * Creates a new rental in the database.
   * @param rentalData - Partial data for creating a rental.
   * @returns The created `Rental` entity.
   * @throws BadRequestException if foreign key constraints are violated.
   */
  async createRental(rentalData: Partial<Rental>): Promise<Rental> {
    try {
      return await this.rentalRepository.save(rentalData); // Save the rental data
    } catch (error) {
      if (error.code === '23503') { // PostgreSQL foreign key violation error code
        throw new BadRequestException(
          'Invalid foreign key. Ensure customerId, filmId, and staffId exist.',
        );
      }
      throw error; // Rethrow other errors for global handling
    }
  }

  /**
   * Creates or updates a rental in the database.
   * Can be used flexibly for both creation and updates.
   * @param rentalData - Partial data for creating or updating a rental.
   * @returns The created or updated `Rental` entity.
   */
  async createOrUpdateRental(rentalData: Partial<Rental>): Promise<Rental> {
    return await this.rentalRepository.save(rentalData); // Save or update rental data
  }

  /**
   * Retrieves all rentals from the database.
   * Includes relations with `Customer` and `Film` entities.
   * @returns An array of `Rental` entities.
   */
  async findAll(): Promise<Rental[]> {
    return await this.rentalRepository.find({
      relations: ['customer', 'film'], // Include customer and film relations
    });
  }

  /**
   * Retrieves rentals based on dynamic filters.
   * Supports filtering by `customerId`, `rentalDate`, and `returnDate`.
   * @param filters - Partial `Rental` object containing filter criteria.
   * @returns An array of filtered `Rental` entities.
   */
  async findWithFilters(filters: Partial<Rental>): Promise<Rental[]> {
    const query = this.rentalRepository.createQueryBuilder('rental'); // Start query builder

    // Filter by customerId if provided
    if (filters.customerId) {
      query.andWhere('rental.customerId = :customerId', { customerId: filters.customerId });
    }

    // Filter by rentalDate if provided
    if (filters.rentalDate) {
      query.andWhere('rental.rentalDate >= :rentalDate', { rentalDate: filters.rentalDate });
    }

    // Filter by returnDate if provided
    if (filters.returnDate) {
      query.andWhere('rental.returnDate <= :returnDate', { returnDate: filters.returnDate });
    }

    return await query.getMany(); // Execute the query and return the results
  }
}
