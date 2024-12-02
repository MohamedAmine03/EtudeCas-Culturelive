import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { FilmService } from './film.service';
import { Film } from './entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

/**
 * Controller for managing films.
 * Exposes CRUD operations and integrates with Swagger for documentation.
 */
@ApiTags('Films') // Groups the endpoints under the "Films" category in Swagger
@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  /**
   * Retrieves all films from the database.
   * @returns An array of films.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all films' }) // Brief summary for Swagger
  @ApiResponse({ status: 200, description: 'List of all films.', type: [Film] }) // Expected response
  async findAll(): Promise<Film[]> {
    return await this.filmService.findAll();
  }

  /**
   * Retrieves a specific film by its ID.
   * @param id - The ID of the film to retrieve.
   * @returns The requested film.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a film by ID' }) // Swagger operation summary
  @ApiParam({ name: 'id', type: Number, description: 'Film ID to retrieve' }) // ID parameter documentation
  @ApiResponse({
    status: 200,
    description: 'Film retrieved successfully.',
    type: Film,
  })
  @ApiResponse({ status: 404, description: 'Film not found.' }) // Handling missing film
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Film> {
    return await this.filmService.findOne(id);
  }

  /**
   * Creates a new film in the database.
   * @param createFilmDto - The data for the new film.
   * @returns The created film.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new film' })
  @ApiBody({ type: CreateFilmDto }) // Swagger documentation for the request body
  @ApiResponse({
    status: 201,
    description: 'Film created successfully.',
    type: Film,
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  async create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    return await this.filmService.createFilm(createFilmDto);
  }

  /**
   * Updates an existing film by its ID.
   * @param id - The ID of the film to update.
   * @param filmData - The updated data for the film.
   * @returns The updated film.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing film by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Film ID to update' })
  @ApiBody({ type: UpdateFilmDto }) // Swagger documentation for the update body
  @ApiResponse({
    status: 200,
    description: 'Film updated successfully.',
    type: Film,
  })
  @ApiResponse({ status: 404, description: 'Film not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number, // Ensures the ID is parsed as an integer
    @Body() filmData: Partial<CreateFilmDto>, // Accepts partial updates
  ): Promise<Film> {
    return await this.filmService.updateFilm(id, filmData);
  }

  /**
   * Deletes a specific film by its ID.
   * @param id - The ID of the film to delete.
   * @returns Nothing if successful.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a film by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Film ID to delete' })
  @ApiResponse({ status: 204, description: 'Film deleted successfully.' }) // No content on successful deletion
  @ApiResponse({ status: 404, description: 'Film not found.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.filmService.deleteFilm(id);
  }
}
