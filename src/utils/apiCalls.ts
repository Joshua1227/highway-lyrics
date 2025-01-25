interface TitleItem {
    id: string
    title: string
}

// interface Titles extends Array<TitleItem> { }

async function GetAllTitles(): Promise<TitleItem[]> {

    // We can use the `Headers` constructor to create headers
    // and assign it as the type of the `headers` variable
    const headers: Headers = new Headers()
    // Add a few headers
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    // Create the request object, which will be a RequestInfo type. 
    // Here, we will pass in the URL as well as the options object as parameters.
    const request: RequestInfo = new Request('http://<IPAddress>/getAllTitles', {
        method: 'GET',
        headers: headers
    })

    // For our example, the data is stored on a static `users.json` file
    const res = await fetch(request)
    const res_1 = await res.json()
    return res_1 as TitleItem[]
}

export default GetAllTitles
