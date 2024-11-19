import { ITEMSCATEGORY } from "@/models/items-category";
import { IStore } from "@/models/store";
import { Coordinates } from "./coordinates";
import { CoordReferenceType } from "@/models/coordinates";
import { Menus } from "./menus";
import { Ratings } from "./ratings";
import { RatingType } from "@/models/rating";

export const Stores: IStore[] = [
  {
    id: 1,
    regionRef: 1,
    name: "Mphoza",
    logoUrl: undefined,
    defaultLogo: { gradient: { from: "#28ed5d", to: "#28ede6" } },
    description: "Mphoza serves ikota ranging from R15 to R80",
    location: Coordinates.find(
      (coord) =>
        coord.ref.ref === 1 && coord.ref.type === CoordReferenceType.STORE
    )!,
    menu: Menus.filter((menu) => menu.storeRef === 1),
    extras: [
      { name: "Buddy Coke", price: 18, imageUrl: undefined },
      { name: "Extra Cheese", price: 2, imageUrl: undefined },
    ],
    ratings: Ratings.filter((rating) => rating.ref.ref === 1 && rating.ref.type === RatingType.STORE),
  },
  {
    id: 2,
    regionRef: 1,
    name: "John",
    logoUrl: undefined,
    defaultLogo: { gradient: { from: "#2856ed", to: "#c928ed" } },
    description: "John serves ikota ranging from R15 to R80",
    location: Coordinates.find(
      (coord) =>
        coord.ref.ref === 2 && coord.ref.type === CoordReferenceType.STORE
    )!,
    menu: Menus.filter((menu) => menu.storeRef === 2),
    extras: undefined,
    ratings: Ratings.filter((rating) => rating.ref.ref === 2 && rating.ref.type === RatingType.STORE),
  },
  {
    id: 3,
    regionRef: 2,
    name: "Joe",
    logoUrl: undefined,
    defaultLogo: { gradient: { from: "#ed288b", to: "#ed288b" } },
    description: "Joe serves serves Indian cuisine ranging from R15 to R80",
    location: Coordinates.find(
      (coord) =>
        coord.ref.ref === 3 && coord.ref.type === CoordReferenceType.STORE
    )!,
    menu: Menus.filter((menu) => menu.storeRef === 3),
    extras: undefined,
    ratings: Ratings.filter((rating) => rating.ref.ref === 3 && rating.ref.type === RatingType.STORE),
  },
];
