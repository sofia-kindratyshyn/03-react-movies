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
import MovieModal from "../MovieModal/MovieModal"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

type MovieObj = Movie | null


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieObj>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [iserror, setIsError] = useState(false)
    async function handleGet(str: string) {
        try {
            setIsLoading(true)
            setIsError(false)
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
            setMovies([])
            setIsError(true)
        } finally {
            setIsLoading(false)
        }      

    }
    const openModal = (prp: Movie) => { setIsOpen(true); setSelectedMovie(prp)};
    const closeModal = () => {setIsOpen(false)};
return (
    <>
        <div><Toaster /></div>
        <SearchBar onSubmit={handleGet} />
        <Loader loadStatus={isLoading}></Loader>
        <MovieGrid movies={movies} onSelect={openModal} />
        {iserror && <ErrorMessage />}
        {isOpen && selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={closeModal} />
)}
</>
)
}