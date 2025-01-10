import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FlyToPoint: React.FC<{ position: [number, number] }> = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 13); // Fly to the new position with a zoom level of 13
        }
    }, [map, position]);

    return null; // This component doesn't render anything on the map
};


export default FlyToPoint