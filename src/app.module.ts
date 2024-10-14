import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { QuickBooksModule } from './quickbooks/quickbooks.module';
import { ZohoModule } from './zoho/zoho.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nest_oauth'), // Replace with your MongoDB connection string
        AuthModule,
        QuickBooksModule,
        ZohoModule,
    ],
})
export class AppModule {}
