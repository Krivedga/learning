import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatsDocument = Stats & Document;


@Schema()
export class Stats {

    @Prop()
    statKey: string;

    @Prop()
    count: number;
}

export const StatsScheme = SchemaFactory.createForClass(Stats);