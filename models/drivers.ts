import { ICoordinates } from "./coordinates";

export default interface IDriver {
  id: number;
  position: ICoordinates;
  owner: { name: string };
}
