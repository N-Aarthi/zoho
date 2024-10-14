import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OAuthDocument = OAuth & Document;
@Schema()
export class OAuth {
    @Prop({ required: true })
    provider: string;

    @Prop()
    clientId: string;

    @Prop()
    clientSecret: string;

    @Prop()
    redirectUri: string;

    @Prop()
    accessToken: string;

    @Prop()
    refreshToken: string;

    @Prop()
    expiresIn: number;
}


// Export the schema as a constant
export const OAuthSchema = SchemaFactory.createForClass(OAuth);