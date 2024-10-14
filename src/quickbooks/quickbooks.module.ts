import { Module } from '@nestjs/common';
import { QuickBooksService } from './quickbooks.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    providers: [QuickBooksService],
    exports: [QuickBooksService],
})
export class QuickBooksModule {}
