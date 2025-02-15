export interface TitleItem {
    id: string
    title: string
}

export interface Song {
    // TODO: Add song numbers. populate when fetching titles (Assuming they're in order)
    number: number
    title: string
    lyrics: string
}

export interface UniqueSong {
    id: string
    title: string
    lyrics: string
}
