import { ITEMSCATEGORY } from "@/models/items-category";
import { RatingType } from "@/models/rating";
import ISoldItem from "@/models/sold-item";
import { Ratings } from "./ratings";

export const Menus: ISoldItem[] = [
  {
    id: 1,
    storeRef: 1,
    name: "Number 1",
    description: "This is a kota worth R15. Number 1 on the list",
    price: 15,
    imageUrl: "/kota.jpg?v=1",
    category: ITEMSCATEGORY.KOTA,
    ingredients: ["Vienna", "Polony"],
    ratings: Ratings.filter((rating) => rating.ref.ref === 1 && rating.ref.type === RatingType.STORE),
  },
  {
    id: 2,
    storeRef: 1,
    name: "Number 2",
    description: "This is a kota worth R18. Number 1 on the list",
    price: 18,
    imageUrl: "/kota.jpg?v=1",
    category: ITEMSCATEGORY.KOTA,
    ingredients: ["Vienna", "Polony"],
    ratings: Ratings.filter((rating) => rating.ref.ref === 2 && rating.ref.type === RatingType.STORE),
  },
  {
    id: 3,
    storeRef: 2,
    name: "Number 1",
    description: "This is a kota worth R15. Number 1 on the list",
    price: 15,
    imageUrl: "/kota.jpg?v=1",
    category: ITEMSCATEGORY.KOTA,
    ingredients: ["Vienna", "Polony"],
  },
  {
    id: 4,
    storeRef: 2,
    name: "Number 2",
    description: "This is a kota worth R18. Number 1 on the list",
    price: 18,
    imageUrl: "/kota.jpg?v=1",
    category: ITEMSCATEGORY.KOTA,
    ingredients: ["Vienna", "Polony"],
  },
  {
    id: 5,
    storeRef: 3,
    name: "Number 1",
    description: "This is a kota worth R15. Number 1 on the list",
    price: 15,
    imageUrl: "/kota.jpg?v=1",
    category: ITEMSCATEGORY.KOTA,
    ingredients: ["Vienna", "Polony"],
  },
  {
    id: 6,
    storeRef: 3,
    name: "Number 2",
    description: "This is a kota worth R18. Number 1 on the list",
    price: 18,
    imageUrl: "/kota.jpg?v=1",
    category: ITEMSCATEGORY.KOTA,
    ingredients: ["Vienna", "Polony"],
  },
];
