import { post } from "../schema";
import { faker } from "../../lib/faker";
import { basename } from 'path'
import { db } from '..'
import { sql } from 'drizzle-orm';

let count = 0
const MAX_COUNT = 40

async function* getUserId() {
  while (count < MAX_COUNT) {
    const result = await db.query.user.findFirst({
      orderBy: sql.raw('random()'),
    })
    yield result!.id
    count++
  }
}

export default async () => {
  const data: (typeof post.$inferInsert)[] = [];
  for await (const id of getUserId()) {
    data.push({
      content: faker.lorem.paragraph(),
      authorId: id,
    });
  }

  console.info(`Seed start ${basename(__filename)}`);
  await db.insert(post).values(data);
  console.info(`Seed done ${basename(__filename)}`);
}
