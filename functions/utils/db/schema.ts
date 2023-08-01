import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core";

export const blocks = mysqlTable('blocks', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 200 }),
  block_type: int('type'),
  user_id: int('user_id').references(() => users.id),
  label: varchar('label', { length: 200 })
});

export const blocksRelations = relations(blocks, ({ one }) => ({
  user: one(users, {
    fields: [blocks.user_id],
    references: [users.id]
  })
}))

export const sections = mysqlTable('sections', {
  id: serial('id').primaryKey(),
  user_id: int('user_id'),
  size: int('size'), 
  display_order: int('display_order')
})

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 120 }),
  tagline: varchar('tagline', { length: 250 }),
  display_name: varchar('display_name', { length: 250 }),
})