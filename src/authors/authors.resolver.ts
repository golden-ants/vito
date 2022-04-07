import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Book } from 'src/books/entities/book.entity';
import { BooksService } from 'src/books/books.service';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ): Promise<Author> {
    return this.authorsService.create(createAuthorInput);
  }

  @Query(() => Author, { name: 'author' })
  async findById(@Args('_id') id: string): Promise<Author> {
    return this.authorsService.findById(id);
  }

  @Query(() => [Author], { name: 'authors' })
  async find(
    @Args('skip', { type: () => Int, nullable: true }) skip: number,
    @Args('limit', { type: () => Int, nullable: true }) limit: number,
    @Args('start_key_doc_id', { nullable: true })
    start_key_doc_id: string,
  ): Promise<Author[]> {
    return this.authorsService.find({
      limit: limit ?? 25,
      skip,
      start_key_doc_id,
    });
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ): Promise<Author> {
    return this.authorsService.update(updateAuthorInput);
  }

  @Mutation(() => Author)
  async removeAuthor(
    @Args('_id') id: string,
    @Args('_rev') rev: string,
  ): Promise<Author> {
    return this.authorsService.remove(id, rev);
  }

  @ResolveField(() => [Book])
  async books(@Parent() author: Author): Promise<Book[]> {
    return this.booksService.findByAuthor(author._id);
  }
}
