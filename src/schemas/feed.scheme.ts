import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LikeModel } from './models/like.model';

export type FeedDocument = Feed & Document;


@Schema()
export class Feed {

    @Prop()
    id: number;

    @Prop()
    text: string;

    @Prop()
    imageUrl: string;

    @Prop()
    description: string;

    @Prop()
    likes: LikeModel;
    
}

export const FeedScheme = SchemaFactory.createForClass(Feed);