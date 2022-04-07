## Author
Egor Efimenko, `michel90843@gmail.com` or `efimenkoegor@vk.com`

Telegram/WhatsApp - `+7-(996)-395-63-71`

## Running the app
```bash
$ git clone https://github.com/golden-ants/vito.git

$ cd ./vito

$ docker-compose up
```

## Let me play
At [http://localhost:5000/graphql](http://localhost:5000/graphql) you can try graphql queries:

```graphql
query {
  books(limit:10, skip: 5, start_key_doc_id: "016d02f0-a0a9-4c90-96ca-cea51d4fcedc") {
    _id
    title
    pages
    year
    author {
      _id
      name
      books {
        _id
        title
      }
    }
  }
}
```

```graphql
query {
  authors {
    name
    books {
      title
    }
  }
}
```

```graphql
query {
  author(_id: "04af740b-d877-48ab-a031-b333abf31658") {
    _id
    _rev
    name
    books {
      _id
      title
    }
  }
}
```
