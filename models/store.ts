import ICoordinates from "./coordinates";
import { IRatings } from "./rating";

export interface IStore {
  id: number;
  name: string;
  logoUrl: string | undefined;
  description: string;
  tags: string[];
  location: ICoordinates;
  menu: {
    item: {
      name: string;
      description: string;
      price: number;
      imageUrl: string | undefined;
      includes: string[];
    };
  }[];
  extras:
    | {
        name: string;
        price: number;
        imageUrl: string | undefined;
      }[]
    | undefined;
  ratings: IRatings;
}
