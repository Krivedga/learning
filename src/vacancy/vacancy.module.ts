import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { Vacancy, VacancyScheme } from 'src/schemas/vacancy.scheme';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancyScheme }]),
],
  providers: [VacancyService],
  controllers: [VacancyController]
})
export class VacancyModule {}
