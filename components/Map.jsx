import { useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import geoJsonData from '../mocks/Regional.json';

const Map = ({ setSelectedRegion }) => {
  // Sirve para almacenar la region seleccionada anteriormente y ponerle el color default despues
  const prevSelectedRegion = useRef();

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Region) {
      layer.on({
        click: () => {
          // Si ya hay una region seleccionada, se cambia el color de la anterior al default
          if (prevSelectedRegion.current) {
            prevSelectedRegion.current.setStyle({ color: '#3388ff', fillOpacity: 0.22 });
          }
          prevSelectedRegion.current = layer;
          // Se cambia el color de la region seleccionada
          layer.setStyle({ color: '#008000', fillOpacity: 0.4 });
          // Dato para utilizar en el birds y filtrar segun la region
          setSelectedRegion(feature.properties.Region);
          // Popup con el nombre de la region
          layer.bindPopup(feature.properties.Region).openPopup();
        }
      });
    }
  };

  // Se retorna el Mapa con las regiones e información del GeoJson Regional
  return (
    <div style={{borderRadius: '10px', overflow: 'hidden'}}>
    <MapContainer
      center={[-41.55, -73.05]}
      zoom={6.5}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      // zIndex es para que no se sobreponga el mapa sobre el header
      style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
    </MapContainer>
    </div>
  );
};

export default Map;
