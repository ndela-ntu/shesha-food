import IRating, { RatingType } from "@/models/rating";

export const Ratings: IRating[] = [
  {
    id: 1,
    userId: 5,
    rating: 3.5,
    timestamp: "2024-01-01T10:00:00Z",
    ref: { ref: 1, type: RatingType.STORE },
  },
  {
    id: 2,
    userId: 1,
    rating: 3,
    timestamp: "2024-01-01T10:00:00Z",
    ref: { ref: 1, type: RatingType.STORE },
  },
  {
    id: 3,
    userId: 1,
    rating: 4.5,
    timestamp: "2024-01-01T10:00:00Z",
    ref: { ref: 1, type: RatingType.STORE },
  },
  {
    id: 4,
    userId: 2,
    rating: 3.8,
    timestamp: "2024-01-02T14:30:00Z",
    ref: { ref: 2, type: RatingType.STORE },
  },
  {
    id: 5,
    userId: 3,
    rating: 5.0,
    timestamp: "2024-01-03T08:15:00Z",
    ref: { ref: 3, type: RatingType.STORE },
  },
  {
    id: 6,
    userId: 1,
    rating: 4.5,
    timestamp: "2024-01-01T10:00:00Z",
    ref: { ref: 1, type: RatingType.FOOD },
  },
  {
    id: 7,
    userId: 1,
    rating: 3.5,
    timestamp: "2024-01-01T10:00:00Z",
    ref: { ref: 1, type: RatingType.FOOD },
  },
  {
    id: 8,
    userId: 2,
    rating: 4,
    timestamp: "2024-01-01T10:00:00Z",
    ref: { ref: 2, type: RatingType.FOOD },
  },
  {
    id: 9,
    userId: 2,
    rating: 3,
    timestamp: "2024-01-01T10:00:00Z",
    ref: { ref: 2, type: RatingType.FOOD },
  },
];
