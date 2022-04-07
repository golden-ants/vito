import Nano from 'nano';
import path from 'path';
import fs from 'fs/promises';

const { COUCHDB_PASSWORD, COUCHDB_USER, COUCHDB_PORT, COUCHDB_HOST } =
  process.env;
const url = `http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@${COUCHDB_HOST}:${COUCHDB_PORT}/`;

const DATA_DIR = './data';

const files = await fs.readdir(DATA_DIR);

const ss = Nano(url);

async function init(file) {
  const name = path.basename(file, '.json');
  try {
    await ss.db.destroy(name);
  } finally {
    await ss.db.create(name);
  }
  const ds = ss.db.use(name);
  await fs
    .readFile(path.join(DATA_DIR, file))
    .then(JSON.parse)
    .then((array) => ds.bulk({ docs: array }))
    .catch(console.log);
}

async function check() {
  try {
    await ss.info();
  } catch (err) {
    console.log(err);
    return setTimeout(check, 5000);
  }
  try {
    for (const file of files) {
      await init(file);
    }
  } catch (err) {
    console.log(err);
  }
}

check();
