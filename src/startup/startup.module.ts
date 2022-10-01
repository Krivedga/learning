import { Module } from '@nestjs/common';
import { StartupService } from './startup.service';
import { StartupController } from './startup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Startup, StartupScheme } from './schemas/startup.scheme';
import { StartupLike, StartupLikeScheme } from './schemas/startup-like.scheme';
import { StartupDescription, StartupDescriptionScheme } from './schemas/description.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Startup.name, schema: StartupScheme }]),
    MongooseModule.forFeature([{ name: StartupLike.name, schema: StartupLikeScheme }]),
    MongooseModule.forFeature([{ name: StartupDescription.name, schema: StartupDescriptionScheme }]),
],
  providers: [StartupService],
  controllers: [StartupController]
})
export class StartupModule {}
