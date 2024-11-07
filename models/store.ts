import ICoordinates from "./coordinates";
import { IRatings } from "./rating";
import ISoldItems from "./sold-item";

export interface IStore {
  id: number;
  name: string;
  logoUrl: string | undefined;
  description: string;
  tags: string[];
  location: ICoordinates;
  menu: {
    items: ISoldItems[];
  };
  extras:
    | {
        name: string;
        price: number;
        imageUrl: string | undefined;
      }[]
    | undefined;
  ratings: IRatings;
}
