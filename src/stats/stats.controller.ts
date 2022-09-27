import { Body, Controller, Post } from '@nestjs/common';
import { StatsModel } from 'src/schemas/models/stats.model';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post('add')
  async stat(@Body() dto: StatsModel) {
    return this.statsService.addStat(dto);
  }
}
