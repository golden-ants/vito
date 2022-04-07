import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule)],
  providers: [AuthorsResolver, AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
