import { ObjectType, Field } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';

@ObjectType()
export class Author {
  @Field()
  _id: string;

  @Field()
  _rev?: string;

  @Field()
  name: string;

  @Field(() => [Book], { nullable: 'items' })
  books: string[];
}
