//import css from "../App/App.module.css"
//import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieGrid from "../MovieGrid/MovieGrid"
//import MovieModal from "../MovieModal/MovieModal"
import SearchBar from "../SearchBar/SearchBar"
import toast, { Toaster } from "react-hot-toast"
import fetchMovies from "../../services/movieService"
import { useState } from "react"
import type { Movie } from "../../types/movie"
import Loader from "../Loader/Loader"


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    async function handleGet(str: string) {
        try {
            setIsLoading(true)
            const responce = await fetchMovies(str);
            if ((responce.length > 1)) {
                setMovies(responce)
                return responce
            } else {
                toast.error("No movies found for your request.")
                setMovies([])
            }
        } catch {
            toast.error("Something went wrong, please try again!")
        } finally {
            setIsLoading(false)
        }      
}
return (
    <>
        <div><Toaster /></div>
        <SearchBar onSubmit={handleGet} />
        <Loader loadStatus={isLoading}></Loader>
        <MovieGrid movies={movies}/>
</>
)
}