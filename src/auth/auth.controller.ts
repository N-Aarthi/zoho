import { Controller, Get, Query, Res } from '@nestjs/common';
import { ZohoService } from '../zoho/zoho.service';
import { QuickBooksService } from '../quickbooks/quickbooks.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly zohoService: ZohoService,
        private readonly quickBooksService: QuickBooksService,
    ) {}

    // Zoho OAuth redirect
    @Get('zoho')
    async redirectToZoho(@Res() res: Response) {
        const zohoAuthorizeUrl = await this.zohoService.getAuthorizationUrl();
        return res.redirect(zohoAuthorizeUrl);
    }

    // Zoho OAuth callback
    @Get('zoho/callback')
    async handleZohoCallback(@Query('code') zohoAuthCode: string) {
        const zohoTokens = await this.zohoService.getAccessToken(zohoAuthCode);
        return { success: true, tokens: zohoTokens };
    }

    // Refresh Zoho access token
    @Get('zoho/refresh-token')
    async refreshZohoAccessToken() {
        const refreshedTokens = await this.zohoService.refreshAccessToken();
        return { success: true, tokens: refreshedTokens };
    }

    // QuickBooks OAuth redirect
    @Get('quickbooks')
    async redirectToQuickBooks(@Res() res: Response) {
        const quickBooksAuthorizeUrl = await this.quickBooksService.getAuthorizationUrl();
        return res.redirect(quickBooksAuthorizeUrl);
    }

    // QuickBooks OAuth callback
    @Get('quickbooks/callback')
    async handleQuickBooksCallback(@Query('code') quickBooksAuthCode: string) {
        const quickBooksTokens = await this.quickBooksService.getAccessToken(quickBooksAuthCode);
        return { success: true, tokens: quickBooksTokens };
    }

    // Refresh QuickBooks access token
    @Get('quickbooks/refresh-token')
    async refreshQuickBooksAccessToken() {
        const refreshedTokens = await this.quickBooksService.refreshAccessToken();
        return { success: true, tokens: refreshedTokens };
    }

    
}
