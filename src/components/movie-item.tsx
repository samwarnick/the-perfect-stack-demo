import type { FC } from "hono/jsx";
import type { Movie } from "../db/schema";

export const MovieItem: FC<{
	movie: Movie;
	favorited: boolean;
	remove: boolean;
}> = ({ movie, favorited, remove }) => {
	return (
		<div class="movie">
			<div class="poster">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
				/>
			</div>
			<div>
				<h3>
					{movie.title}
					{movie.release_date && (
						<>({new Date(movie.release_date).getFullYear()})</>
					)}
				</h3>
				{favorited ? (
					<button
						hx-post={`/favorite/${movie.id}`}
						hx-vals={JSON.stringify(movie)}
						hx-target={remove ? "closest li" : "this"}
						hx-swap={remove ? "delete" : "outerHTML"}
						hx-select={remove ? ".movie" : "[type='button']"}
						type="button"
					>
						Unfavorite
					</button>
				) : (
					<button
						hx-post={`/favorite/${movie.id}`}
						hx-vals={JSON.stringify(movie)}
						hx-select="[type='button']"
						hx-swap="outerHTML"
						type="button"
					>
						Favorite
					</button>
				)}
			</div>
		</div>
	);
};
