import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Task Entity
 *
 * Represents a scheduled task in the system, tracking its metadata and status.
 */
@Entity('task') // Maps the class to the "task" table in the database
export class Task {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number; // Unique identifier for each task

  @Column() // Simple string column
  name: string; // Name of the task (e.g., 'J-5', 'J-3')

  @Column({ default: 'pending' }) // Default value is "pending"
  status: string; // Status of the task: pending, running, completed, or failed

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Auto-generated timestamp
  createdAt: Date; // Timestamp when the task was created

  @Column({ type: 'timestamp', nullable: true }) // Nullable column for updates
  updatedAt: Date; // Timestamp when the task was last updated
}
