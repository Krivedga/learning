import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CategoryEnum } from 'src/vacancy/enums/category.enum';
import { GradeEnum } from 'src/vacancy/enums/grade.enum';
import { VacancyType } from 'src/vacancy/enums/vacancy-type.enum';

export type VacancyDocument = Vacancy & Document;


@Schema()
export class Vacancy {

    @Prop()
    description: string;

    @Prop()
    views: number;

    @Prop()
    type: VacancyType;

    @Prop()
    category: CategoryEnum;

    @Prop()
    grade: GradeEnum;
}

export const VacancyScheme = SchemaFactory.createForClass(Vacancy);