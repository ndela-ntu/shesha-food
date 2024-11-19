import { ITEMSCATEGORY } from "@/models/items-category";
import IRating from "@/models/rating";
import IRegion from "@/models/region";
import { Coordinates } from "./coordinates";
import { CoordReferenceType } from "@/models/coordinates";
import { Stores } from "./stores";

const averageRating = (ratings: IRating[]) => {
  const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return Number((total / ratings.length).toFixed(1));
};

export const Regions: IRegion[] = [
  {
    id: 1,
    name: "Freedom Park",
    coordinates: Coordinates.find(
      (coord) =>
        coord.ref.ref === 1 && coord.ref.type === CoordReferenceType.REGION
    )!,
    stores: Stores.filter((store) => store.regionRef === 1),
    drivers: [
      {
        id: 1,
        position: { id: 1, lat: 0, lng: 0, name: "Freedom Park" },
        owner: { name: "Lindelani" },
      },
    ],
  },
  {
    id: 2,
    name: "Eldorado Park",
    coordinates: Coordinates.find(
      (coord) =>
        coord.ref.ref === 2 && coord.ref.type === CoordReferenceType.REGION
    )!,
    stores: Stores.filter((store) => store.regionRef === 2),
    drivers: [
      {
        id: 1,
        position: {
          id: 1,
          name: "X545 Location",
          lat: -26.293151,
          lng: 27.934056,
        },
        owner: { name: "Lindelani" },
      },
      {
        id: 1,
        position: {
          id: 1,
          name: "Y276 Location",
          lat: -26.293151,
          lng: 27.934056,
        },
        owner: { name: "Lindelani" },
      },
    ],
  },
];
