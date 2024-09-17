export interface VideoLink {
    title: string;
    id: string;
}

export type VideoLinks = {
    [key: string]: {
        [key: string]: {
            [key: string]: Array<{
                title: string;
                id: string;
            }>
        }
    }
}