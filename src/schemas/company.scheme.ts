import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CompanyTypeEnum } from 'src/company/enums/company-type.enum';

export type CompanyDocument = Company & Document;


@Schema()
export class Company {

    @Prop()
    imageUrl: string;

    @Prop()
    name: string;

    @Prop()
    websiteUrl: string;

    @Prop()
    contactInfo: string;

    @Prop()
    type: CompanyTypeEnum;
    
}

export const CompanyScheme = SchemaFactory.createForClass(Company);