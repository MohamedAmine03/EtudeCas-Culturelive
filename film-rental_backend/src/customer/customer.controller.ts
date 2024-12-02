import { Controller, Post, Put, Body, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

/**
 * Controller for managing customers.
 * Exposes CRUD operations and filtering functionality.
 */
@ApiTags('Customers') // Groupes les endpoints dans la catégorie "Customers" dans Swagger
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Endpoint to create a new customer.
   * Expects a `CreateCustomerDto` object in the request body.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new customer' }) // Brève description pour Swagger
  @ApiBody({ type: CreateCustomerDto }) // Documentation du corps attendu
  @ApiResponse({
    status: 201,
    description: 'Customer created successfully.',
    type: Customer,
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' }) // Réponse pour les erreurs de validation
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  /**
   * Endpoint to update an existing customer by ID.
   * Expects a `Partial<Customer>` object in the request body.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing customer' })
  @ApiParam({ name: 'id', type: Number, description: 'Customer ID to update' }) // Paramètre d'URL
  @ApiBody({ type: UpdateCustomerDto }) // Documentation pour le DTO utilisé
  @ApiResponse({
    status: 200,
    description: 'Customer updated successfully.',
    type: Customer,
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' }) // Réponse pour les cas où l'ID est introuvable
  async updateCustomer(
    @Param('id') id: number, // Récupère l'ID depuis les paramètres de l'URL
    @Body() customerData: Partial<Customer>, // Accepte des données partiellement modifiées
  ) {
    customerData.id = id; // Associe l'ID au client
    return await this.customerService.createOrUpdateCustomer(customerData);
  }

  /**
   * Endpoint to retrieve all customers.
   * Returns a list of all customers in the database.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all customers' }) // Description pour Swagger
  @ApiResponse({
    status: 200,
    description: 'List of customers.',
    type: [Customer], // Le type attendu est un tableau de `Customer`
  })
  async getAllCustomers() {
    return await this.customerService.findAll(); // Appelle le service pour récupérer tous les clients
  }

  /**
   * Endpoint to retrieve customers with optional filters.
   * Supports filtering by first name, last name, and email.
   */
  @Get('filter')
  @ApiOperation({ summary: 'Retrieve customers with filters' }) // Résumé pour Swagger
  @ApiQuery({
    name: 'firstName',
    required: false,
    type: String,
    description: 'Filter by first name',
  }) // Ajout de filtre par prénom
  @ApiQuery({
    name: 'lastName',
    required: false,
    type: String,
    description: 'Filter by last name',
  }) // Ajout de filtre par nom
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Filter by email',
  }) // Ajout de filtre par email
  @ApiResponse({
    status: 200,
    description: 'Filtered list of customers.',
    type: [Customer], // Retourne une liste filtrée de `Customer`
  })
  async findCustomersWithFilters(
    @Query('firstName') firstName?: string, // Filtre par prénom
    @Query('lastName') lastName?: string, // Filtre par nom
    @Query('email') email?: string, // Filtre par email
  ): Promise<Customer[]> {
    const filters: Partial<Customer> = {
      firstName,
      lastName,
      email,
    };
    return await this.customerService.findWithFilters(filters); // Appelle le service avec les filtres
  }
}
