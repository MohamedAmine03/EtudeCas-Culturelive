import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rental } from '../../rental/entities/rental.entity';

/**
 * Represents the `Film` entity in the database.
 * Maps to the `film` table and defines its columns and relationships.
 */
@Entity('film')
export class Film {
  @PrimaryGeneratedColumn({ name: 'film_id' }) // Primary key with auto-increment
  id: number; // Unique identifier for the film

  @Column({ name: 'title', length: 255 }) // Title column with a max length of 255
  title: string; // Title of the film

  @Column({ name: 'description', type: 'text', nullable: true }) // Optional text description
  description: string; // Description of the film (optional)

  @Column({ name: 'release_year', type: 'int', nullable: true }) // Optional release year
  releaseYear: number; // Release year of the film (optional)

  @Column({ name: 'rental_duration', type: 'int', default: 7 }) // Default rental duration is 7 days
  rentalDuration: number; // Duration of the rental in days

  @Column({ name: 'language_id' }) // Foreign key to the language table (assumed)
  languageId: number; // ID of the language associated with the film

  @Column({ name: 'original_language_id', nullable: true }) // Optional original language ID
  originalLanguageId: number; // ID of the original language (if different)

  @Column({
    name: 'rental_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 4.99, // Default rental rate
  })
  rentalRate: number; // Rental rate for the film

  @Column({ name: 'length', type: 'smallint', nullable: true }) // Optional film length in minutes
  length: number; // Length of the film in minutes (optional)

  @Column({
    name: 'replacement_cost',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 19.99, // Default replacement cost
  })
  replacementCost: number; // Cost to replace the film

  @Column({
    name: 'rating',
    type: 'enum',
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'], // Predefined rating values
    default: 'G', // Default rating
  })
  rating: string; // Film rating classification

  @Column({
    name: 'last_update',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', // Default to current timestamp
  })
  lastUpdate: Date; // Timestamp of the last update

  @Column({
    name: 'special_features',
    type: 'text',
    array: true, // Stores an array of text values
    nullable: true,
  })
  specialFeatures: string[]; // Special features of the film (optional)

  @Column({ name: 'fulltext', type: 'tsvector' }) // Used for full-text search
  fulltext: string; // Full-text search field

  @OneToMany(() => Rental, (rental) => rental.film) // One-to-many relationship with the Rental entity
  rentals: Rental[]; // Associated rentals for the film
}
