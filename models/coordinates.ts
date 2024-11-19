export enum CoordReferenceType {
  REGION,
  STORE,
  DRIVER
}

type CoordReference = {
  ref: number;
  type: CoordReferenceType;
};

export interface ICoordinates {
  id: number;
  name: string;
  lat: number;
  lng: number;
  ref: CoordReference;
}
