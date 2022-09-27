import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedModule } from './feed/feed.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsModule } from './stats/stats.module';
import { CompanyModule } from './company/company.module';
import { VacancyModule } from './vacancy/vacancy.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://user1:Il6CjnOzlBmiKEtK@cluster0.f2cvtwy.mongodb.net/test'),
    FeedModule,
    StatsModule,
    CompanyModule,
    VacancyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
