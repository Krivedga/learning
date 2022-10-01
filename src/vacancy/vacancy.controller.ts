import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VacancyModel } from './vacancy.model';
import { VacancyService } from './vacancy.service';

@Controller('vacancy')
export class VacancyController {
    constructor(private readonly vacancyService: VacancyService){

    }
    @Post('create')
    async create(@Body() dto: VacancyModel) {
        return this.vacancyService.create(dto);
    }
    @Patch('update/:id')
    async update(@Body() dto: VacancyModel, @Param('id') id: string){
        return this.vacancyService.update(dto,id);
    }
    @Get('get/:id')
    async get(@Param('id') id: string){
        return this.vacancyService.get(id);
    }
    @Get("getAll/:page")
    async getAll(@Param('page') page: number){
        return this.vacancyService.getAll(page);
    }
    @Delete("delete/:id")
    async delete(@Param('id') id: number){
        return this.vacancyService.delete(id);
    }
}
