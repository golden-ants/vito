import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field(() => Int)
  pages: number;

  @Field(() => Int)
  year: number;

  @Field()
  author: string;
}
