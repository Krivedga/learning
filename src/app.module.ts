import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedModule } from './feed/feed.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsModule } from './stats/stats.module';
import { CompanyModule } from './company/company.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email/email.service';
import { StartupModule } from './startup/startup.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://user1:Il6CjnOzlBmiKEtK@cluster0.f2cvtwy.mongodb.net/test'),
    FeedModule,
    StatsModule,
    CompanyModule,
    VacancyModule,
    AuthModule,
    StartupModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService,]
})
export class AppModule {}
