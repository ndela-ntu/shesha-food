export default async function reverseGeocode({
  location,
}: {
  location: { latitude: number; longitude: number };
}) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location?.latitude}&lon=${location?.longitude}`
    );

    const data = await response.json();
    return data.name;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}
