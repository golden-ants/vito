import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Mutation(() => Book)
  async createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
  ): Promise<Book> {
    return this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  async find(
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
    @Args('start_key_doc_id', { nullable: true })
    start_key_doc_id: string,
  ): Promise<Book[]> {
    return this.booksService.find({
      limit: limit ?? 25,
      skip,
      start_key_doc_id,
    });
  }

  @Query(() => Book, { name: 'book' })
  async findById(
    @Args('_id', { type: () => String }) id: string,
  ): Promise<Book> {
    return this.booksService.findById(id);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
  ): Promise<Book> {
    return this.booksService.update(updateBookInput);
  }

  @Mutation(() => Book)
  async removeBook(
    @Args('_id') id: string,
    @Args('_rev') rev: string,
  ): Promise<Book> {
    return this.booksService.remove(id, rev);
  }

  @ResolveField(() => Author)
  async author(@Parent() book: Book): Promise<Author> {
    return this.authorsService.findById(book.author);
  }
}
