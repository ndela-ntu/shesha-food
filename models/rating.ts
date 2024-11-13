export default interface IRating  {
    id: number;
    userId: number;
    rating: number;
    timestamp: string;
    type: 'Food' | 'Store'
}
