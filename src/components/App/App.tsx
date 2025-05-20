import css from "../App/App.module.css"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Loader from "../Loader/Loader"
import MovieGrid from "../MovieGrid/MovieGrid"
import MovieModal from "../MovieModal/MovieModal"
import SearchBar from "../SearchBar/SearchBar"
import axios from "axios"

export default function App(){
return (
<>
<ErrorMessage/>
<Loader/>
<MovieGrid/>
<MovieModal/>
<SearchBar/>
</>
)
}