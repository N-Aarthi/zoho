import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OAuth, OAuthDocument } from './schemas/oauth.schema';

@Injectable()
export class OAuthService {
    constructor(@InjectModel(OAuth.name) private oauthModel: Model<OAuthDocument>) {}

    // Find credentials by provider (e.g., 'zoho' or 'quickbooks')
    async getOAuthDetails(provider: string): Promise<OAuthDocument | null> {
        const oauthDetails = await this.oauthModel.findOne({ provider }).exec();
        console.log(`OAuth details for ${provider}:`, oauthDetails);  // Logging added here
        return oauthDetails;
    }

    // Save or update OAuth details (clientId, clientSecret, redirectUri)
    async saveOAuthDetails(oauthData: Partial<OAuth>): Promise<OAuth> {
        const existingOAuth = await this.oauthModel.findOne({ provider: oauthData.provider }).exec();
        if (existingOAuth) {
            return this.oauthModel.findByIdAndUpdate(existingOAuth._id, oauthData, { new: true }).exec();
        } else {
            const oauth = new this.oauthModel(oauthData);
            return oauth.save();
        }
    }

    // Save or update tokens (accessToken, refreshToken, expiresIn)
    async saveTokens(provider: string, tokens: Partial<OAuth>): Promise<OAuth> {
        return this.oauthModel.findOneAndUpdate(
            { provider },
            {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                expiresIn: tokens.expiresIn,
                lastAuthorizedAt: new Date(),
            },
            { new: true },
        ).exec();
    }
}
