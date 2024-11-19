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
        position: Coordinates.find((coord) => coord.ref.ref === 1 && CoordReferenceType.DRIVER)!,
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
        id: 2,
        position: Coordinates.find((coord) => coord.ref.ref === 2 && CoordReferenceType.DRIVER)!,
        owner: { name: "Lindelani" },
      },
      {
        id: 3,
        position: Coordinates.find((coord) => coord.ref.ref === 3 && CoordReferenceType.DRIVER)!,
        owner: { name: "Lindelani" },
      },
    ],
  },
];
