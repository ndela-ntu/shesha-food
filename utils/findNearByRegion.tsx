import IRegion from "@/models/region";

interface Location {
    lat: number;
    lng: number;
}

const calculateDistance = (loc1: Location, loc2: Location): number => {
  const R = 6371;
  const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const dLon = ((loc2.lng - loc1.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.lat * Math.PI) / 180) *
      Math.cos((loc2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const findNearbyRegion = (
  userLocation: Location,
  regions: IRegion[]
): IRegion | null => {
    let closestRegion: IRegion | null = null
    let shortestDistance = 1 // Initialize with the max distance of 1 km
  
    for (const region of regions) {
      const distance = calculateDistance(userLocation, region.coordinates)
      
      if (distance <= 1 && (closestRegion === null || distance < shortestDistance)) {
        closestRegion = region
        shortestDistance = distance
      }
    }
    return closestRegion
};
