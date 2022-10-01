import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommentModel } from './models/comment.model';

export type StartupDocument = Startup & Document;


@Schema()
export class Startup {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    url: string;

    @Prop()
    isModerated: boolean = false;

    @Prop()
    imagesUrl: string[];

    @Prop()
    views: number;

    @Prop()
    Rating: number;
}

export const StartupScheme = SchemaFactory.createForClass(Startup);