import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanyScheme } from 'src/schemas/company.scheme';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanyScheme }]),
],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
