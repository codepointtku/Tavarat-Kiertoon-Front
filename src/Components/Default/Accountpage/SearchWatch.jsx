import { useLoaderData } from "react-router-dom"

function SearchWatch() {
    const loaderData = useLoaderData()
    console.log(loaderData)
    return <h1>Hakuvahti :-----D</h1>
}

export default SearchWatch