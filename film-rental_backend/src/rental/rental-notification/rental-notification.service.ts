import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from '../entities/rental.entity'; // Entité Rental
import { Customer } from '../../customer/entities/customer.entity'; // Entité Customer
import * as moment from 'moment-timezone';

@Injectable()
export class RentalNotificationService {
  private readonly logger = new Logger(RentalNotificationService.name);

  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  @Cron('0 12 * * *') // Exécution quotidienne à 12h
  async handleRentalNotifications() {
    this.logger.log(
      'Début de la tâche planifiée : Envoi des notifications pour les locations.',
    );

    // Récupérer toutes les locations actives
    const rentals = await this.rentalRepository.find({
      relations: ['customer'], // Joindre les informations du client
    });

    const now = moment();

    for (const rental of rentals) {
      const returnDate = moment.tz(rental.returnDate, rental.customer.timezone);

      // Vérifiez si aujourd'hui correspond à J-5 ou J-3
      if (
        returnDate.diff(now, 'days') === 5 ||
        returnDate.diff(now, 'days') === 3
      ) {
        const notificationDay =
          returnDate.diff(now, 'days') === 5 ? 'J-5' : 'J-3';

        this.logger.log(
          `Notification pour ${notificationDay}: Location ID ${rental.id} (Client: ${rental.customer.email})`,
        );

        // Simuler l'envoi d'un email
        this.sendEmailNotification(
          rental.customer.email,
          notificationDay,
          rental.returnDate,
        );
      }
    }

    this.logger.log('Fin de la tâche planifiée : Notifications envoyées.');
  }

  private sendEmailNotification(
    email: string,
    notificationDay: string,
    returnDate: Date,
  ) {
    // Log simulant l'envoi d'un email
    this.logger.log(
      `Email envoyé à ${email}: Rappel de la location (${notificationDay}). Date de retour : ${returnDate}`,
    );
  }
}
