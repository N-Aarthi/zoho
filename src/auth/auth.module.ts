import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { OAuthService } from './oauth.service';
import { OAuth, OAuthSchema } from './schemas/oauth.schema';
import { ZohoService } from '../zoho/zoho.service';
import { QuickBooksService } from '../quickbooks/quickbooks.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: OAuth.name, schema: OAuthSchema }]),
    ],
    providers: [
        OAuthService,
        ZohoService,
        QuickBooksService,
    ],
    controllers: [AuthController],
    exports: [OAuthService], // Ensure OAuthService is exported
})
export class AuthModule {}
