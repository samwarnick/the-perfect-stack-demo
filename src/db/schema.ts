import type { InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const favoriteMovies = sqliteTable("favorite_movies", {
	id: integer("id").notNull().unique(),
	title: text("title").notNull(),
	release_date: text("release_date").notNull(),
	poster_path: text("poster_path").notNull(),
});
export type Movie = InferSelectModel<typeof favoriteMovies>;
export const insertMovieSchema = createInsertSchema(favoriteMovies, {
	id: z.coerce.number(),
});
