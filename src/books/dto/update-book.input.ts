import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput {
  @Field()
  _id: string;

  @Field()
  _rev?: string;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  pages?: number;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field({ nullable: true })
  author?: string;
}
