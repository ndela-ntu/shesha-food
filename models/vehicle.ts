import ICoordinates from "./coordinates";

export default interface IVehicle {
  id: number;
  registration: string;
  idleAt: ICoordinates;
  owner: { name: string };
}
