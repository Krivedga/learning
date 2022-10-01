import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/schemas/company.scheme';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}
  async create(createCompanyDto): Promise<Company> {
    try {
      const createdCompany = new this.companyModel(createCompanyDto);
      return await createdCompany.save();
    } catch (error) {}
  }
  async update(updateCompanyDto, id): Promise<Company> {
    try {
      return this.companyModel.findOneAndUpdate({ _id: id }, updateCompanyDto);
    } catch (error) {
      
    }
  }
  async get(id): Promise<Company>{
    try {
      return this.companyModel.findById(id);
    } catch (error) {
      
    }
  }
  async getAll(page: number): Promise<Company[]>{
    try {
      const allCompanies = await this.companyModel.find().exec();
      const size = allCompanies.length;
      const maxPerPage = 20;
      const maxPages = Math.floor(size/maxPerPage);
      if (page > maxPages) page = maxPages;
      const limitedCompanies = []
  
      for (let i = page * maxPerPage; i < (page + 1) * maxPerPage; i++) {
        if (i >= size) break;
        limitedCompanies.push(allCompanies[i]);
      }
  
      return limitedCompanies;
    } catch (error) {
      
    }

  }
  async delete(id: number): Promise<Company> {
    try {
      return this.companyModel.findByIdAndRemove(id);
    } catch (error) {
      
    }
  }
}
