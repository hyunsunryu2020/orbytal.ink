
import * as dotenv from 'dotenv'
import { mysqlTable, serial, text, varchar, int } from "drizzle-orm/mysql-core";

dotenv.config()

export const blocks = mysqlTable('blocks', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 200 }),
  block_type: int('type')
});
