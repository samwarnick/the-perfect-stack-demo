import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import type { FC } from "hono/jsx";
import { logger } from "hono/logger";
import { validator } from "hono/validator";
import { z } from "zod";
import { MovieItem } from "./components/movie-item";
import { db } from "./db/db";
import { favoriteMovies, insertMovieSchema } from "./db/schema";
import { Favorites } from "./pages/favorites";
import { Search } from "./pages/search";
import { searchForMovie } from "./tmdb";

const app = new Hono();

app.use(logger());

app.use(
	"/assets/*",
	serveStatic({
		root: "./",
		rewriteRequestPath: (path) => path.replace(/^\/assets/, "/src/assets"),
	}),
);

const Layout: FC = (props) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>The Perfect Stack</title>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
				/>
				<link rel="stylesheet" href="/assets/styles.css" />
				<script src="https://unpkg.com/htmx.org@1.9.11" />
				<script
					defer
					src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.8/dist/cdn.min.js"
				/>
			</head>
			<body>
				<main class="container">
					<nav>
						<ul>
							<li>
								<strong>The Perfect Stack</strong>
							</li>
						</ul>
						<ul>
							<li>
								<a href="/">Search</a>
							</li>
							<li>
								<a href="/favorites">Favorites</a>
							</li>
						</ul>
					</nav>
					{props.children}
				</main>
			</body>
		</html>
	);
};

app.get("/", (c) => {
	return c.html(
		<Layout>
			<Search />
		</Layout>,
	);
});

const searchSchema = z.object({
	search: z.string(),
});
app.post(
	"/search",
	validator("form", (value, c) => {
		const parsed = searchSchema.safeParse(value);
		if (!parsed.success) {
			return c.text("Invalid!", 401);
		}
		return parsed.data;
	}),
	async (c) => {
		const { search } = c.req.valid("form");
		const results = await searchForMovie(search);
		const favorites = (await db.select().from(favoriteMovies)).map((r) => r.id);
		return c.html(<Search results={results} favorites={favorites} />);
	},
);

app.post("/favorite", zValidator("form", insertMovieSchema), async (c) => {
	const movie = c.req.valid("form");

	await db.insert(favoriteMovies).values(movie);
	return c.html(<MovieItem movie={movie} favorited={true} remove={false} />);
});

app.delete("/favorite/:id", async (c) => {
	const id = Number.parseInt(c.req.param("id"));

	const removed = await db
		.delete(favoriteMovies)
		.where(eq(favoriteMovies.id, id))
		.returning();
	return c.html(
		<MovieItem movie={removed[0]} favorited={false} remove={false} />,
	);
});

app.get("/favorites", async (c) => {
	const favorites = await db.select().from(favoriteMovies);

	return c.html(
		<Layout>
			<Favorites favorites={favorites} />
		</Layout>,
	);
});

export default app;
