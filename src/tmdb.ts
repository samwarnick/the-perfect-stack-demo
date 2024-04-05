import type { Movie } from "./db/schema";

const BASE_URL = "https://api.themoviedb.org/3/";
const KEY = Bun.env.TMDB_KEY;

export async function searchForMovie(search: string): Promise<Movie[]> {
	const url = `${BASE_URL}search/movie?`;
	const params = new URLSearchParams({
		include_adult: "false",
		language: "en-US",
		query: search,
		api_key: KEY,
	});
	const res = await fetch(url + params);
	const { results } = (await res.json()) as { results: Movie[] };
	return results;
}
