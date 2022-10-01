import { CategoryEnum } from "./enums/category.enum";
import { GradeEnum } from "./enums/grade.enum";
import { VacancyType } from "./enums/vacancy-type.enum";

export class VacancyModel {
  description: string;

  views: number;

  type: VacancyType;

  category: CategoryEnum;

  grade: GradeEnum;
}
