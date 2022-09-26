import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LikeModel } from './models/like.model';

export type LikeDocument = Like & Document;


@Schema()
export class Like {

    @Prop()
    id: number;

    @Prop()
    amount: number;

    
}

export const LikeScheme = SchemaFactory.createForClass(Like);