import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DocumentScope } from 'nano';
import { InjectScope } from 'src/nano';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectScope(Book) private readonly scope: DocumentScope<Book>) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const { id, rev } = await this.scope.insert({
      _id: randomUUID(),
      ...createBookInput,
    });
    return {
      _id: id,
      _rev: rev,
      ...createBookInput,
    };
  }

  async find(params: {
    skip: number;
    limit: number;
    start_key_doc_id: string;
  }): Promise<Book[]> {
    const { rows } = await this.scope.list({ include_docs: true, ...params });
    return rows.map((row) => row.doc);
  }

  async findById(id: string): Promise<Book> {
    return await this.scope.get(id);
  }

  async findByIdAndRev(id: string, rev: string): Promise<Book> {
    return await this.scope.get(id, { rev });
  }

  async findByAuthor(id: string): Promise<Book[]> {
    const { docs } = await this.scope.find({
      selector: {
        author: { $eq: id },
      },
    });
    return docs;
  }

  async update(updateBookInput: UpdateBookInput): Promise<Book> {
    const { _id, _rev } = updateBookInput;
    const book = await this.findByIdAndRev(_id, _rev);
    const updated = { ...book, updateBookInput };
    await this.scope.insert(updated);
    return updated;
  }

  async remove(id: string, rev: string): Promise<Book> {
    const book = await this.findByIdAndRev(id, rev);
    await this.scope.destroy(id, rev);
    return book;
  }
}
