import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput {
  @Field()
  _id: string;

  @Field()
  _rev?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  books?: string[];
}
