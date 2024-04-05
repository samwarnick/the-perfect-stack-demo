import type { FC } from "hono/jsx";
import { MovieItem } from "../components/movie-item";
import type { Movie } from "../db/schema";

export const Search: FC<{ results?: Movie[]; favorites?: number[] }> = ({
	results,
	favorites,
}) => {
	return (
		<div id="search">
			<h1>Search</h1>
			<form
				role="search"
				hx-post="/search"
				hx-target="#search"
				hx-swap="outerHTML"
			>
				<input name="search" type="search" placeholder="Search a movie" />
				<input type="submit" value="Search" />
			</form>
			{!!results && (
				<>
					<h2>Results</h2>
					<ul class="search-results">
						{results?.map((movie) => (
							<li>
								<MovieItem
									movie={movie}
									favorited={favorites?.includes(movie.id) ?? false}
									remove={false}
								/>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};
