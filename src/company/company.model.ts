import { CompanyTypeEnum } from './enums/company-type.enum';

export class CompanyModel {
  imageUrl: string;

  name: string;

  websiteUrl: string;

  contactInfo: string;

  type: CompanyTypeEnum;
}
