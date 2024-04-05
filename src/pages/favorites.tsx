import type { FC } from "hono/jsx";
import { MovieItem } from "../components/movie-item";
import type { Movie } from "../db/schema";

export const Favorites: FC<{ favorites: Movie[] }> = ({ favorites }) => {
	return (
		<>
			<h1>Favorites</h1>
			<ul class="search-results">
				{favorites.map((movie) => (
					<li>
						<MovieItem movie={movie} favorited={true} remove={true} />
					</li>
				))}
			</ul>
		</>
	);
};
