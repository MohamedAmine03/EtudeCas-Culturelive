import { Rental } from 'src/rental/entities/rental.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

/**
 * Represents the `Customer` entity in the database.
 * Maps to the `customer` table with its columns and relationships.
 */
@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn({ name: 'customer_id' }) // Primary key for the customer table
  id: number;

  @Column({ name: 'first_name' }) // First name of the customer
  firstName: string;

  @Column({ name: 'last_name' }) // Last name of the customer
  lastName: string;

  @Column({ name: 'email', nullable: true }) // Email address (optional)
  email: string;

  @Column({ name: 'store_id' }) // ID of the store associated with the customer
  storeId: number;

  @Column({ name: 'address_id' }) // ID of the customer's address
  addressId: number;

  @Column({ name: 'activebool', default: true }) // Boolean flag for the active status (default: true)
  activeBool: boolean;

  @Column({
    name: 'create_date',
    type: 'date',
    default: () => 'CURRENT_DATE',
  }) // Date when the customer was created (default: current date)
  createDate: Date;

  @Column({
    name: 'last_update',
    type: 'timestamp',
    nullable: true,
  }) // Timestamp of the last update to the customer's data (optional)
  lastUpdate: Date;

  @Column({ name: 'active', nullable: true }) // Numeric representation of the active status (optional)
  active: number;

  @Column({ name: 'timezone', nullable: false }) // Timezone for the customer (used for notifications)
  timezone: string;

  @OneToMany(() => Rental, (rental) => rental.customer) // One-to-many relationship with the `Rental` entity
  rentals: Rental[];
}
