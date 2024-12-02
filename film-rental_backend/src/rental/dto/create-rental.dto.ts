import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a rental.
 * Ensures proper validation and Swagger documentation for rental creation.
 */
export class CreateRentalDto {
  @IsNotEmpty() // Validation: Field must not be empty
  @IsDateString() // Validation: Field must be a valid ISO 8601 date string
  @ApiProperty({
    example: '2024-11-21T12:00:00Z',
    description: 'Start date of the rental (ISO 8601 format)',
    required: true,
  })
  rentalDate: Date; // Start date of the rental

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    example: '2024-11-28T12:00:00Z',
    description: 'Return date of the rental (ISO 8601 format)',
    required: true,
  })
  returnDate: Date; // Return date of the rental

  @IsNotEmpty()
  @IsNumber() // Validation: Field must be a number
  @ApiProperty({
    example: 1,
    description: 'Inventory ID of the rented item',
    required: true,
  })
  inventoryId: number; // ID of the inventory item being rented

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'Customer ID associated with the rental',
    required: true,
  })
  customerId: number; // ID of the customer renting the item

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 3,
    description: 'Staff ID responsible for the rental',
    required: true,
  })
  staffId: number; // ID of the staff member processing the rental
}
