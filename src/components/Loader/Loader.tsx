import css from "../Loader/Loader.module.css"

interface LoaderProps{
    loadStatus: boolean
}

export default function Loader({ loadStatus }: LoaderProps) {
    return(
    <>
        {loadStatus && <p className={css.text}>Loading movies, please wait...</p>}
        </>
    )
}