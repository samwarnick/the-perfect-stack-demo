CREATE TABLE `favorite_movies` (
	`id` integer NOT NULL,
	`title` text NOT NULL,
	`release_date` text NOT NULL,
	`poster_path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorite_movies_id_unique` ON `favorite_movies` (`id`);