import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LikeDocument = Like & Document;


@Schema()
export class Like {

    @Prop()
    feedId: string;

    @Prop()
    amount: number;

    @Prop()
    usersId: string[];
}

export const LikeScheme = SchemaFactory.createForClass(Like);