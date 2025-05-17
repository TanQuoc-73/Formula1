export async function fetchLocationData(lat: number, lon: number): Promise<string> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const data = await response.json();
  return data.display_name; // Địa chỉ cụ thể
}
