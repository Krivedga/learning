import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stats, StatsScheme } from 'src/schemas/stats.scheme';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stats.name, schema: StatsScheme }]),
],
  controllers: [StatsController],
  providers: [StatsService]
})
export class StatsModule {}
