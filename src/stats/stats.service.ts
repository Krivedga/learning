import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatsModel } from 'src/schemas/models/stats.model';
import { Stats, StatsDocument } from 'src/schemas/stats.scheme';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Stats.name) private statModel: Model<StatsDocument>,
  ) {}

  async addStat(dto: StatsModel): Promise<Stats> {
    try {
      const statKey = dto.statKey;
      const amount: number = dto.amount;

      const stat = await this.statModel.findOne({ statKey: statKey });
      const count: number = stat.count;
      await this.statModel.findOneAndUpdate(
        { statKey: statKey },
        { count: count + amount },
      );

      return await this.statModel.findOne({ statKey: statKey });
    } catch (error) {
      const statKey = dto.statKey;
      const amount: number = dto.amount;

      const createdStats = new this.statModel({
        statKey: statKey,
        count: amount,
      });
      createdStats.save();
    }
  }
}
