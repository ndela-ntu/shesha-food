import ICoordinates from "./coordinates";
import IRating from "./rating";
import ISoldItems from "./sold-item";

export interface IStore {
  id: number;
  name: string;
  logoUrl: string | undefined;
  defaultLogo: { gradient: { from: string; to: string } };
  description: string;
  tags: string[];
  location: ICoordinates;
  menu: ISoldItems[];
  extras:
    | {
        name: string;
        price: number;
        imageUrl: string | undefined;
      }[]
    | undefined;
  ratings: IRating[];
}
