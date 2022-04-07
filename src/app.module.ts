import { Module } from '@nestjs/common';
import { NanoModule } from './nano/nano.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/book.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

const { COUCHDB_PASSWORD, COUCHDB_USER, COUCHDB_PORT, COUCHDB_HOST } =
  process.env;
const url = `http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${COUCHDB_HOST}:${COUCHDB_PORT}/`;

@Module({
  controllers: [],
  providers: [],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: process.env.NODE_ENV === 'development',
    }),
    NanoModule.forRoot({
      nanoOptions: {
        url: url,
      },
      scopeOptions: {
        use: [Author, Book],
        create: true,
      },
    }),
    AuthorsModule,
    BooksModule,
  ],
})
export class AppModule {}
