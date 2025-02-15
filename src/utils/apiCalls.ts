import { UniqueSong, Song } from "./models"

// interface Titles extends Array<TitleItem> { }

export async function GetAllTitles(): Promise<UniqueSong[]> {

    // We can use the `Headers` constructor to create headers
    // and assign it as the type of the `headers` variable
    const headers: Headers = new Headers()
    // Add a few headers
    headers.set('Content-Type', 'application/json')
    // headers.set('Accept', 'application/json')

    // Create the request object, which will be a RequestInfo type. 
    // Here, we will pass in the URL as well as the options object as parameters.
    const request: RequestInfo = new Request('http://106.51.61.53:8080/getAllTitles', {
        method: 'GET'
    })


    // For our example, the data is stored on a static `users.json` file
    const res = await fetch(request)
    const jsonifiedRes = await res.json()
    console.log("DATA: ", jsonifiedRes)
    return jsonifiedRes as UniqueSong[]
}

export async function GetSongById(songId: string): Promise<Song> {

    // We can use the `Headers` constructor to create headers
    // and assign it as the type of the `headers` variable
    const headers: Headers = new Headers()
    // Add a few headers
    headers.set('Content-Type', 'application/json')
    // headers.set('Accept', 'application/json')

    // Create the request object, which will be a RequestInfo type. 
    // Here, we will pass in the URL as well as the options object as parameters.
    const request: RequestInfo = new Request(`http://106.51.61.53:8080/getSongId/${songId}`, {
        method: 'GET'
    })

    // For our example, the data is stored on a static `users.json` file
    const res = await fetch(request)
    const jsonifiedRes = await res.json()
    console.log("DATA: ", jsonifiedRes)
    return jsonifiedRes as Song
}

export async function SearchSongs(key: string): Promise<UniqueSong[]> {

    // We can use the `Headers` constructor to create headers
    // and assign it as the type of the `headers` variable
    const headers: Headers = new Headers()
    // Add a few headers
    headers.set('Content-Type', 'application/json')
    // headers.set('Accept', 'application/json')

    // Create the request object, which will be a RequestInfo type. 
    // Here, we will pass in the URL as well as the options object as parameters.
    const request: RequestInfo = new Request(`http://106.51.61.53:8080/searchSongs/${key}`, {
        method: 'GET'
    })

    // For our example, the data is stored on a static `users.json` file
    const res = await fetch(request)
    const jsonifiedRes = await res.json()
    console.log("DATA: ", jsonifiedRes)
    return jsonifiedRes as UniqueSong[]
}