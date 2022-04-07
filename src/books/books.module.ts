import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [forwardRef(() => AuthorsModule)],
  providers: [BooksResolver, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
