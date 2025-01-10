import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import FlyToPoint from './FlyToPoint';
import useMapAction from '@/store/useMapAction';

type MapProps = {
  center: LatLngExpression;
  zoom: number;
};

const Map = ({ center, zoom }: MapProps) => {
  const { currentLocation } = useMapAction()

  return (
    <>
      <MapContainer
        center={currentLocation ?? center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: "8px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={center} >
          <Popup>Default Location</Popup>
        </Marker>

        <FlyToPoint position={currentLocation} />
      </MapContainer>
    </>
  );
};

export default Map;
