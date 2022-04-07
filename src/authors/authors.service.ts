import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DocumentScope } from 'nano';
import { InjectScope } from 'src/nano';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectScope(Author) private readonly scope: DocumentScope<Author>,
  ) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const { id, rev } = await this.scope.insert({
      _id: randomUUID(),
      ...createAuthorInput,
    });
    return { _id: id, _rev: rev, ...createAuthorInput };
  }

  async find(params: {
    skip: number;
    limit: number;
    start_key_doc_id: string;
  }): Promise<Author[]> {
    const { rows } = await this.scope.list({ include_docs: true, ...params });
    return rows.map((row) => row.doc);
  }

  async findById(id: string): Promise<Author> {
    return await this.scope.get(id);
  }

  async findByIdAndRev(id: string, rev: string): Promise<Author> {
    return await this.scope.get(id, { rev });
  }

  async update(updateAuthorInput: UpdateAuthorInput): Promise<Author> {
    const { _id, _rev } = updateAuthorInput;
    const author = await this.findByIdAndRev(_id, _rev);
    const updated = { ...author, ...updateAuthorInput };
    await this.scope.insert(updated);
    return updated;
  }

  async remove(id: string, rev: string): Promise<Author> {
    const author = await this.findByIdAndRev(id, rev);
    await this.scope.destroy(id, rev);
    return author;
  }
}
