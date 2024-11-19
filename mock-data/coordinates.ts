import { CoordReferenceType, ICoordinates } from "@/models/coordinates";

export const Coordinates: ICoordinates[] = [
  {
    id: 1,
    name: "Region 1 Center",
    lat: -26.291952,
    lng: 27.936952,
    ref: { ref: 1, type: CoordReferenceType.REGION },
  },
  {
    id: 2,
    name: "Region 2 Center",
    lat: -26.291905,
    lng: 27.911338,
    ref: { ref: 2, type: CoordReferenceType.REGION },
  },
  {
    id: 3,
    name: "Mphoza",
    lat: -26.295634,
    lng: 27.93444,
    ref: { ref: 1, type: CoordReferenceType.STORE },
  },
  {
    id: 4,
    name: "John",
    lat: -26.295269,
    lng: 27.932051,
    ref: { ref: 2, type: CoordReferenceType.STORE },
  },
  {
    id: 5,
    name: "Joe",
    lat: -26.29619,
    lng: 27.920145,
    ref: { ref: 3, type: CoordReferenceType.STORE },
  },
];
