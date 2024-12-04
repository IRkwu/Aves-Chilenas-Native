import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import geoJsonData from "../mocks/Regional.json";

const MapMobile = ({ setSelectedRegion }) => {
  const [regionName, setRegionName] = useState(null); // Estado para almacenar el nombre de la región seleccionada

  // Pruebas para cambiar color de región seleccionada
  const getFillColor = () => {
    const color = regionName === 'Región de Los Lagos' ? "#3388ff" : "#008000";
    return color; 
  }

  return (
    <View style={styles.container}>
      {/* Coordenadas y Zoom Inicial*/}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -41.55,
          longitude: -73.05,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {/* Implementación del GeoJSON, colores de borde, fondo y función al dar click */}
        <Geojson
          tappable={true}
          geojson={geoJsonData}
          strokeColor={getFillColor()}
          fillColor="rgba(51,136,255,0.22)"
          strokeWidth={1}
          onPress={(event) => {
            setSelectedRegion(event.feature.properties.Region);
            setRegionName(event.feature.properties.Region);
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapMobile;
