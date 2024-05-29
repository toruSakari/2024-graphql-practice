import { user } from "../schema";
import { faker } from "../../lib/faker";
import { basename } from 'path'
import { db } from '..'

export default async () => {
  const data: (typeof user.$inferInsert)[] = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }

  console.info(`Seed start ${basename(__filename)}`);
  await db.insert(user).values(data);
  console.info(`Seed done ${basename(__filename)}`);
}
