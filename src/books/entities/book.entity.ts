import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';

@ObjectType()
export class Book {
  @Field()
  _id: string;

  @Field()
  _rev?: string;

  @Field()
  title: string;

  @Field(() => Int)
  pages: number;

  @Field(() => Int)
  year: number;

  @Field(() => Author)
  author: string;
}
