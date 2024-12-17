import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

type MapProps = {
  center: LatLngExpression;
  zoom: number;
};

const Map = ({ center, zoom }: MapProps) => {

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={center}>
        <Popup>Default Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
