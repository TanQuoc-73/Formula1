// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "450px",
};

const center = {
  lat: 20.9802797,
  lng: 105.7895063,
};

export default function Map() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBpVz-VcfndZh8XBVX1NERJP223EhfnLZY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
