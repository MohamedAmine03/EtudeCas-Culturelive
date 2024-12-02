import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';

/**
 * FilmModule
 *
 * This module manages the `Film` feature, including:
 * - Database integration with TypeORM for the `Film` entity.
 * - Business logic in the `FilmService`.
 * - HTTP routes and endpoints in the `FilmController`.
 */
@Module({
  imports: [
    // Registers the Film entity with TypeORM for database interactions
    TypeOrmModule.forFeature([Film]),
  ],
  controllers: [
    // Registers the FilmController to handle HTTP requests
    FilmController,
  ],
  providers: [
    // Registers the FilmService to handle business logic
    FilmService,
  ],
})
export class FilmModule {}
