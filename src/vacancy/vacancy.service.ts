import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vacancy, VacancyDocument } from 'src/schemas/vacancy.scheme';

@Injectable()
export class VacancyService {
    constructor(
        @InjectModel(Vacancy.name) private vacancyModel: Model<VacancyDocument>,
      ) {}
    async create(dto){
      try {
        const createdVacancy = new this.vacancyModel(dto);
        return await createdVacancy.save();
      } catch (error) {}
    }
    async getAll(page){
      try {
        const allVacancies = await this.vacancyModel.find().exec();
        const size = allVacancies.length;
        const maxPerPage = 20;
        const maxPages = Math.floor(size/maxPerPage);
        if (page > maxPages) page = maxPages;
        const limitedVacancies = []
    
        for (let i = page * maxPerPage; i < (page + 1) * maxPerPage; i++) {
          if (i >= size) break;
          limitedVacancies.push(allVacancies[i]);
        }
    
        return limitedVacancies;
      } catch (error) {
        
      }
    }
    async get(id){
      try {
        return this.vacancyModel.findById(id);
      } catch (error) {
        
      }
    }
    async delete(id){
      try {
        return this.vacancyModel.findByIdAndRemove(id);
      } catch (error) {
        
      }
    }
    async update(dto,id){
      try {
        return this.vacancyModel.findOneAndUpdate({ _id: id }, dto);
      } catch (error) {
        
      }
    }
}
