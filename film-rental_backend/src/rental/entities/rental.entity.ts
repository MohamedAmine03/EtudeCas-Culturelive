/* eslint-disable prettier/prettier */
import { Film } from '../../film/entities/film.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

/**
 * Rental Entity
 * 
 * Represents the `rental` table in the database, defining its schema and relationships.
 */
@Entity('rental')
export class Rental {
  @PrimaryGeneratedColumn({ name: 'rental_id' }) // Primary key with auto-increment
  id: number; // Unique identifier for each rental

  @Column({ name: 'rental_date', type: 'timestamp' }) // Date column for the rental start
  rentalDate: Date; // Start date of the rental

  @Column({ name: 'return_date', type: 'timestamp', nullable: false }) // Date column for the rental return
  returnDate: Date; // Return date of the rental

  @Column({ name: 'inventory_id' }) // Foreign key reference to the inventory
  inventoryId: number; // ID of the rented inventory item

  @Column({ name: 'customer_id' }) // Foreign key reference to the customer
  customerId: number; // ID of the customer renting the item

  @Column({ name: 'staff_id' }) // Foreign key reference to the staff processing the rental
  staffId: number; // ID of the staff responsible for the rental

  @Column({
    name: 'last_update',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', // Auto-updated timestamp
  })
  lastUpdate: Date; // Timestamp for the last update

  @ManyToOne(() => Customer, (customer) => customer.rentals) // Many rentals belong to one customer
  @JoinColumn({ name: 'customer_id' }) // Specifies the join column for the foreign key
  customer: Customer; // Relationship with the `Customer` entity

  @ManyToOne(() => Film, (film) => film.rentals) // Many rentals belong to one film
  @JoinColumn({ name: 'film_id' }) // Specifies the join column for the foreign key
  film: Film; // Relationship with the `Film` entity
}
