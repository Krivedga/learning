import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DescriptionDocument = Description & Document;


@Schema()
export class Description {

    @Prop()
    text: string;

    @Prop()
    userId: string;

    @Prop()
    feedId: string;


    
}

export const DescriptionScheme = SchemaFactory.createForClass(Description);