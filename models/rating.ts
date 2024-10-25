interface IRating  {
    userId: number;
    rating: number;
    comment: string;
    timestamp: string;
}

export interface IRatings {
    ratings: IRating[];
    averageRating: () => number;
}