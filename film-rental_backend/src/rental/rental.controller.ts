/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from './entities/rental.entity';

/**
 * RentalController
 * 
 * Handles HTTP requests for managing rentals.
 * Provides endpoints for creating, updating, and retrieving rentals.
 */
@ApiTags('Rentals') // Groups all endpoints under the "Rentals" category in Swagger
@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  /**
   * Creates a new rental.
   * Validates the input using `CreateRentalDto` and logs the operation in Swagger.
   * @param createRentalDto - Data Transfer Object containing rental details.
   * @returns The created `Rental` entity.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new rental' }) // Brief description for Swagger
  @ApiBody({ type: CreateRentalDto }) // Specifies the DTO for request body validation in Swagger
  @ApiResponse({ status: 201, description: 'Rental created successfully.', type: Rental }) // Success response
  @ApiResponse({ status: 400, description: 'Validation failed.' }) // Error response
  async create(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalService.createRental(createRentalDto);
  }

  /**
   * Creates or updates a rental with partial data.
   * Accepts a flexible payload for both creation and updates.
   * @param rentalData - Partial data for creating or updating a rental.
   * @returns The created or updated `Rental` entity.
   */
  @Post('partial')
  @ApiOperation({ summary: 'Create or update a rental' }) // Swagger description
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        rentalDate: { type: 'string', format: 'date-time', example: '2024-11-21T12:00:00Z' },
        returnDate: { type: 'string', format: 'date-time', example: '2024-11-28T12:00:00Z' },
        inventoryId: { type: 'number', example: 1 },
        customerId: { type: 'number', example: 2 },
        staffId: { type: 'number', example: 3 },
      },
    },
  }) // Manually defined request schema for Swagger
  @ApiResponse({ status: 200, description: 'Rental created or updated successfully.', type: Rental }) // Success response
  async createOrUpdate(@Body() rentalData: Partial<Rental>): Promise<Rental> {
    return this.rentalService.createOrUpdateRental(rentalData);
  }

  /**
   * Retrieves all rentals from the database.
   * Includes relations with `Customer` and `Film` entities.
   * @returns An array of `Rental` entities.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all rentals' }) // Summary for Swagger
  @ApiResponse({ status: 200, description: 'List of all rentals.', type: [Rental] }) // Success response
  async getAllRentals(): Promise<Rental[]> {
    return this.rentalService.findAll();
  }

  /**
   * Retrieves rentals based on dynamic filters.
   * Allows filtering by `customerId`, `rentalDate`, and `returnDate`.
   * @param customerId - Filter by customer ID.
   * @param rentalDate - Filter by rental start date.
   * @param returnDate - Filter by rental return date.
   * @returns A filtered list of `Rental` entities.
   */
  @Get('filter')
  @ApiOperation({ summary: 'Retrieve rentals with filters' }) // Swagger summary
  @ApiQuery({ name: 'customerId', required: false, type: String, description: 'Filter by customer ID' }) // Query param documentation
  @ApiQuery({ name: 'rentalDate', required: false, type: String, description: 'Filter by rental date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'returnDate', required: false, type: String, description: 'Filter by return date (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'List of rentals matching the filters.', type: [Rental] }) // Success response
  async findAll(
    @Query('customerId') customerId?: string,
    @Query('rentalDate') rentalDate?: string,
    @Query('returnDate') returnDate?: string,
  ): Promise<Rental[]> {
    // Parse query parameters for type safety
    const parsedCustomerId = customerId ? Number(customerId) : undefined;
    const parsedRentalDate = rentalDate ? new Date(rentalDate) : undefined;
    const parsedReturnDate = returnDate ? new Date(returnDate) : undefined;

    // Pass parsed filters to the service
    return await this.rentalService.findWithFilters({
      customerId: parsedCustomerId,
      rentalDate: parsedRentalDate,
      returnDate: parsedReturnDate,
    });
  }
}
