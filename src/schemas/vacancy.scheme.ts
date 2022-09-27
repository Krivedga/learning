import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VacancyDocument = Vacancy & Document;


@Schema()
export class Vacancy {

    @Prop()
    statKey: string;

    @Prop()
    count: number;
}

export const VacancyScheme = SchemaFactory.createForClass(Vacancy);