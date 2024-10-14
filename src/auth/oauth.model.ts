// src/auth/oauth.model.ts

import { Schema, Document } from 'mongoose';

export interface OAuth extends Document {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export const OAuthSchema = new Schema({
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    redirectUri: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Number, required: true },
});
