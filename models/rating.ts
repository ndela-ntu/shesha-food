export enum RatingType {
  FOOD,
  STORE,
}

type RatingReference = {
    ref: number;
    type: RatingType;
}

export default interface IRating {
  id: number;
  userId: number;
  rating: number;
  timestamp: string;
  ref: RatingReference;
}
