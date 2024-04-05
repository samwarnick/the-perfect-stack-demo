You need an API key for TMDB: https://developer.themoviedb.org/docs/getting-started
Add a `.env` with:
```
TMDB_KEY=yourkey
```

To install dependencies:
```sh
bun install
```

To setup database:
```sh
bun db:migrate
```

To run:
```sh
bun run dev
```

open http://localhost:3000
