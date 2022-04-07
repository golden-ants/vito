import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;

  @Field(() => [String], { nullable: 'items' })
  books: string[];
}
