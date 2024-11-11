export interface IRating  {
    id: number;
    userId: number;
    rating: number;
    timestamp: string;
    type: 'Food' | 'Store'
}

export interface IRatings {
    ratings: IRating[];
}