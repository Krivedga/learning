import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DescriptionModel } from './schemas/models/description.model';
import { LikeModel } from './schemas/models/like.model';
import { StartupModel } from './schemas/models/startup.model';
import { StartupService } from './startup.service';

@Controller('startup')
export class StartupController {
    constructor(private readonly startupService: StartupService){

    }
    @Post('create')
    async create(@Body() dto: StartupModel) {
        return this.startupService.create(dto);
    }
    @Patch('update/:id')
    async update(@Body() dto: StartupModel, @Param('id') id: string){
        return this.startupService.update(dto,id);
    }
    @Get('get/:id')
    async get(@Param('id') id: string){
        return this.startupService.get(id);
    }
    @Get("getAll/:page")
    async getAll(@Param('page') page: number){
        return this.startupService.getAll(page);
    }
    @Delete("delete/:id")
    async delete(@Param('id') id: number){
        return this.startupService.delete(id);
    }
    @Post('like')
    async like(@Body() dto: LikeModel){
        return this.startupService.like(dto);
    }
    @Post('description')
    async setDescription(@Body() dto: DescriptionModel){
        return this.startupService.description(dto);
    }
    @Patch("description")
    async updateDescription(@Body() dto: DescriptionModel){
        return this.startupService.updateDescription(dto);
    }
    @Delete("description/:id")
    async removeDescription(@Param('id') id: string){
        return this.startupService.removeDescription(id);
    }
    @Get("description/:id")
    async getDescription(@Param('id') id: string){
        return this.startupService.getDescription(id);
    }
}
