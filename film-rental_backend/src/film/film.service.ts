/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

/**
 * FilmService
 * 
 * Handles business logic for the `Film` entity, including CRUD operations
 * and dynamic filtering functionality.
 */
@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>, // Repository for interacting with the Film entity
  ) {}

  /**
   * Retrieves all films from the database.
   * @returns An array of `Film` objects.
   */
  async findAll(): Promise<Film[]> {
    return await this.filmRepository.find(); // Fetches all films
  }

  /**
   * Retrieves a film by its ID.
   * @param id - The ID of the film to retrieve.
   * @returns The `Film` object if found.
   * @throws NotFoundException if the film does not exist.
   */
  async findOne(id: number): Promise<Film> {
    const film = await this.filmRepository.findOneBy({ id });
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`); // Handles non-existent films
    }
    return film;
  }

  /**
   * Creates a new film using the provided DTO.
   * @param createFilmDto - Data Transfer Object containing film details.
   * @returns The created `Film` object.
   */
  async createFilm(createFilmDto: CreateFilmDto): Promise<Film> {
    const film = this.filmRepository.create(createFilmDto); // Creates a new Film entity
    return await this.filmRepository.save(film); // Saves it to the database
  }

  /**
   * Updates an existing film by its ID.
   * @param id - The ID of the film to update.
   * @param filmData - Partial data for updating the film.
   * @returns The updated `Film` object.
   * @throws NotFoundException if the film does not exist.
   */
  async updateFilm(
    id: number,
    filmData: Partial<CreateFilmDto>,
  ): Promise<Film> {
    const film = await this.findOne(id); // Ensures the film exists
    Object.assign(film, filmData); // Updates the film's properties
    return await this.filmRepository.save(film); // Saves the updated film
  }

  /**
   * Deletes a film by its ID.
   * @param id - The ID of the film to delete.
   * @throws NotFoundException if the film does not exist.
   */
  async deleteFilm(id: number): Promise<void> {
    const result = await this.filmRepository.delete(id); // Deletes the film
    if (result.affected === 0) {
      throw new NotFoundException(`Film with ID ${id} not found`); // Handles non-existent films
    }
  }

  /**
   * Retrieves films based on dynamic filters.
   * Supports filtering by title, languageId, and releaseYear.
   * @param filters - Partial `Film` object containing filter criteria.
   * @returns An array of `Film` objects that match the filters.
   */
  async findWithFilters(filters: Partial<Film>): Promise<Film[]> {
    const query = this.filmRepository.createQueryBuilder('film'); // Starts a query builder for dynamic filtering

    // Adds filter for the title if provided
    if (filters.title) {
      query.andWhere('film.title LIKE :title', { title: `%${filters.title}%` });
    }

    // Adds filter for the language ID if provided
    if (filters.languageId) {
      query.andWhere('film.languageId = :languageId', { languageId: filters.languageId });
    }

    // Adds filter for the release year if provided
    if (filters.releaseYear) {
      query.andWhere('film.releaseYear = :releaseYear', { releaseYear: filters.releaseYear });
    }

    return await query.getMany(); // Executes the query and returns the result
  }
}
