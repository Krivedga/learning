import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StartupDescription, StartupDescriptionDocument } from './schemas/description.scheme';
import { DescriptionModel } from './schemas/models/description.model';
import { LikeModel } from './schemas/models/like.model';
import { StartupModel } from './schemas/models/startup.model';
import { StartupLike, StartupLikeDocument } from './schemas/startup-like.scheme';
import { Startup, StartupDocument } from './schemas/startup.scheme';

@Injectable()
export class StartupService {
  constructor(
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
    @InjectModel(StartupLike.name) private likeModel: Model<StartupLikeDocument>,
    @InjectModel(StartupDescription.name) private descModel: Model<StartupDescriptionDocument>,
  ) {}
  async create(createStartupDto): Promise<Startup> {
    try {
      const createdStartup = new this.startupModel(createStartupDto);
      const savedStartup = await createdStartup.save();      
      await new this.likeModel({startupId : savedStartup._id}).save();
      return savedStartup;
    } catch (error) {}
  }
  async update(updateStartupDto, id): Promise<Startup> {
    try {
      return this.startupModel.findOneAndUpdate({ _id: id }, updateStartupDto);
    } catch (error) {
      
    }
  }
  async get(id): Promise<Startup>{
    try {
      return this.startupModel.findById(id);
    } catch (error) {
      
    }
  }
  async getAll(page: number): Promise<Startup[]>{
    try {
      const allCompanies = await this.startupModel.find().exec();
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
  async delete(id: number): Promise<Startup> {
    try {
      return this.startupModel.findByIdAndRemove(id);
    } catch (error) {
      
    }
  }
  async like(dto:LikeModel): Promise<LikeModel> {
    try {
      const startupId = dto.startupId;
      const userId = dto.userId;
      const startup: StartupModel = await this.startupModel.findById(startupId);
      const startupLike = await this.likeModel.findOne({startupId : startupId});      
      let usersId = startupLike.usersId;
      if(usersId.includes(userId)) {
        usersId = usersId.filter((item) => item !== userId);
        return await this.likeModel.findOneAndUpdate({startupId : startupId},{usersId : usersId});
      }else{
        usersId.push(userId);
        return await this.likeModel.findOneAndUpdate({startupId : startupId},{usersId : usersId});
      }

      return null;
    } catch (error) {
      
    }
  }
  async description(dto: DescriptionModel){
    try {
      const createdStartupDesc = new this.descModel(dto);
      return await createdStartupDesc.save();
    } catch (error) {
      
    }
  }
  async updateDescription(dto: DescriptionModel){
    try {
      return this.descModel.findOneAndUpdate({startupId: dto.startupId},dto)
    } catch (error) {
      
    }
  }
  async getDescription(id: string): Promise<DescriptionModel>{
    try {
      return this.descModel.findOne({startupId: id});
    } catch (error) {
      
    }
  }
  async removeDescription(id: string): Promise<DescriptionModel>{
    try {
      return this.descModel.findByIdAndDelete(id);
    } catch (error) {
      
    }
  }
}
