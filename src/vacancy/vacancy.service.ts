import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vacancy, VacancyDocument } from 'src/schemas/vacancy.scheme';

@Injectable()
export class VacancyService {
    constructor(
        @InjectModel(Vacancy.name) private companyModel: Model<VacancyDocument>,
      ) {}
}
