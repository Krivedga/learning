import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyModel } from './company.model';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){

    }

    @Post('create')
    async create(@Body() dto: CompanyModel) {
        return this.companyService.create(dto);
    }
    @Patch('update/:id')
    async update(@Body() dto: CompanyModel, @Param('id') id: string){
        return this.companyService.update(dto,id);
    }
    @Get('get/:id')
    async get(@Param('id') id: string){
        return this.companyService.get(id);
    }
    @Get("getAll/:page")
    async getAll(@Param('page') page: number){
        return this.companyService.getAll(page);
    }
    @Delete("delete/:id")
    async delete(@Param('id') id: number){
        return this.companyService.delete(id);
    }
}
