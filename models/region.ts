import ICoordinates from "./coordinates";
import IVehicle from "./vehicle";
import { IStore } from "./store";

export default interface IRegion {
  id: number;
  name: string;
  coordinates: ICoordinates;
  stores: IStore[]
  vehicles: IVehicle[];
}
