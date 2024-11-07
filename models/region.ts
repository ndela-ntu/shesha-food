import ICoordinates from "./coordinates";
import IDriver from "./drivers";
import ISoldItem from "./sold-item";
import { IStore } from "./store";

export default interface IRegion {
  id: number;
  name: string;
  coordinates: ICoordinates;
  stores: IStore[]
  drivers: IDriver[];
  popularItems: ISoldItem[];
}
