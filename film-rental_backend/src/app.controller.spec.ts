import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Rabat2003*',
      database: 'sakila',
      autoLoadEntities: true,
      synchronize: false, // Désactiver pour éviter des modifications involontaires
    }),
  ],
})
export class AppModule {}
