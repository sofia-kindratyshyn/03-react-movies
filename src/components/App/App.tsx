import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import fetchMovies from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

type MovieObj = Movie | null;

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieObj>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState(false);

    async function handleGet(str: string) {
        try {
            setIsLoading(true);
            setIsError(false);

            const response = await fetchMovies(str);

            if (response.length > 0) {
                setMovies(response);
            } else {
                toast.error("No movies found for your request.");
                setMovies([]);
            }

        } catch {
            toast.error("Something went wrong, please try again!");
            setMovies([]);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const openModal = (movie: Movie) => {
        setIsOpen(true);
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedMovie(null);
    };

    return (
        <>
            <Toaster />
            <SearchBar onSubmit={handleGet} />
            <Loader loadStatus={isLoading} />
            {!isError ? (
                <MovieGrid movies={movies} onSelect={openModal} />
            ) : (
                <ErrorMessage />
            )}
            {isOpen && selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={closeModal} />
            )}
        </>
    );
}
