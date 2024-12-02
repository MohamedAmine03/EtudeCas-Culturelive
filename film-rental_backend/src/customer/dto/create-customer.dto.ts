import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a customer.
 * Ensures validation rules and API documentation are well-defined.
 */
export class CreateCustomerDto {
  @IsNotEmpty() // Validation: The field must not be empty
  @IsString() // Validation: The field must be a string
  @ApiProperty({
    example: 'John',
    description: 'First name of the customer',
    required: true,
  })
  firstName: string; // First name of the customer

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the customer',
    required: true,
  })
  lastName: string; // Last name of the customer

  @IsOptional() // Validation: This field is optional
  @IsEmail() // Validation: Must be a valid email format if provided
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the customer',
    required: false,
  })
  email?: string; // Email of the customer (optional)

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Store ID associated with the customer',
    required: true,
  })
  storeId: number; // The store ID linked to the customer (required)

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 42,
    description: 'Address ID of the customer',
    required: true,
  })
  addressId: number; // The address ID for the customer (required)

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Active status of the customer (optional)',
    required: false,
  })
  activeBool?: boolean; // Active status of the customer (defaults to `true` if not provided)

  @IsOptional()
  @IsDateString() // Validation: Must be a valid ISO date string if provided
  @ApiProperty({
    example: '2024-11-20',
    description: 'Creation date of the customer (optional)',
    required: false,
  })
  createDate?: Date; // Creation date of the customer (optional)

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2024-11-20',
    description: 'Last update date of the customer (optional)',
    required: false,
  })
  lastUpdate?: Date; // Last update date for the customer (optional)

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Active status as a numeric value (optional)',
    required: false,
  })
  active?: number; // Numeric representation of the active status (optional)

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Europe/Paris',
    description: 'Timezone of the customer',
    required: true,
  })
  timezone: string; // Timezone associated with the customer (required)
}

