import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { POSTGRES_URL } from '@/config'
import * as schema from '@/db/schema'
import { buildSchema } from 'drizzle-graphql';
import { injectable } from "inversify";

const client = new Pool({
  connectionString: POSTGRES_URL
})

export const db = drizzle(client, { schema })
export const { entities } = buildSchema(db)

@injectable()
export class Database {
  private client: Pool
  constructor() {
    this.client = this.getClient()
  }

  private getClient() {
    if (this.client instanceof Pool) {
      return this.client
    } else {
      return this.createClient()
    }
  }

  private createClient() {
    return new Pool({
      connectionString: POSTGRES_URL
    })
  }

  getDb() {
    return drizzle(this.client, { schema })
  }
}
