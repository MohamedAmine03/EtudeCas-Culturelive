import { Test, TestingModule } from '@nestjs/testing';
import { RentalNotificationService } from './rental-notification.service';

describe('RentalNotificationService', () => {
  let service: RentalNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalNotificationService],
    }).compile();

    service = module.get<RentalNotificationService>(RentalNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
