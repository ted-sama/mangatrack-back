import { int, text, serial, timestamp, year, mysqlTable, mysqlSchema } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const mangatrackSchema = mysqlSchema("mangatrack_schema");

export const users = mangatrackSchema.table("users", {
    id: serial("id").primaryKey(),
    username: text("username").unique().notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    role: text("role").notNull().default("USER"),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const books = mangatrackSchema.table("books", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    author: text("author").notNull(),
    year: year("year").notNull(),
    genre: text("genre").notNull(),
    description: text("description"),
    added_by: int("added_by").notNull().references(() => users.id, { onDelete: "cascade" }),
});