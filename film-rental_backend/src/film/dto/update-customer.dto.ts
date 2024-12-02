import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

/**
 * DTO for updating a customer.
 * Extends `CreateCustomerDto` and makes all fields optional using `PartialType`.
 */
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
