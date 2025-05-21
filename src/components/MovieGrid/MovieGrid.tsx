import css from "../MovieGrid/MovieGrid.module.css"
import type { Movie } from "../../types/movie"

interface MovieGridProps{
    movies: Movie[];
}


export default function MovieGrid({ movies }: MovieGridProps){
    return(
        <ul className={css.grid}>{
            movies.length >= 0 && movies.map((movie: Movie) =>
            {return (
                <li key={movie.id}>
                <div className={css.card}>
                    <img className={css.image}
                        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                        loading="lazy"
                        />
                        <h2 className={css.title}>{movie.title}</h2>
                </div>
            </li>
            )}
             )
        }
        </ul>

    )
}