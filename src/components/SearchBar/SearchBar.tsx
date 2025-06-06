import toast, { Toaster } from "react-hot-toast"
import styles from "../SearchBar/SearchBar.module.css"

interface SearchBarProps{
    onSubmit: (prop: string) => void
}

export default function SearchBar({onSubmit}: SearchBarProps) {
    
    function handleSubmit(formData: FormData) {
        const value = formData.get("query") as string
        if (value.trim() == "") {
            toast.error("Please enter your search query.")
        } else {
            onSubmit(value)
        }
    }

    return (
        <header className={styles.header}>
            <Toaster />
            <div className={styles.container}>
                <a className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleSubmit}>
                    <input className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus />
                    <button className={styles.button} type="submit"> Search</button>
                </form>
            </div>
            </header>
    )
}