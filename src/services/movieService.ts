import axios from "axios"
import type { Movie } from "../types/movie";

interface MovieHttpResponce{
    results: Movie[]
}

export default async function fetchMovies(str: string) {
    const responce = await axios.get<MovieHttpResponce>(`https://api.themoviedb.org/3/search/movie?query=${str}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }
    })

    return responce.data.results;
}