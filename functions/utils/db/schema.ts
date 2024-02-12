import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  user_id: serial('user_id').primaryKey(),
  email: varchar('email', { length: 120 }).notNull,
  password_hash: varchar('password_hash', { length: 250 }).notNull,
  created_at: timestamp('created_at').defaultNow().notNull
})

// export const usersRelations = relations(users, ({ many }) => ({
//   blocks: many(blocks)
// }));

// export const blocks = mysqlTable('blocks', {
//   id: serial('id').primaryKey(),
//   url: varchar('url', { length: 200 }),
//   block_type: int('type'),
//   user_id: int('user_id'),
//   label: varchar('label', { length: 200 }),
// });

// export const blocksRelations = relations(blocks, ({ one }) => ({
//   user: one(users, {
//     fields: [blocks.user_id],
//     references: [users.id]
//   })
// }))

// export const sections = mysqlTable('sections', {
//   id: serial('id').primaryKey(),
//   user_id: int('user_id'),
//   size: int('size'), 
//   display_order: int('display_order')
// })
