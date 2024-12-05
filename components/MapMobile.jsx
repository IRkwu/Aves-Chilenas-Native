import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import geoJsonData from "../mocks/Regional.json";

const MapMobile = ({ setSelectedRegion }) => {
  const [selectedRegion, setSelectedRegionState] = useState();

  // Para modificar el color de la región seleccionada
  const getFillColor = (regionName) => {
    return regionName === selectedRegion ? "rgba(0,128,0,0.5)" : "rgba(51,136,255,0.5)";
  };

  // Para modificar el color del borde de la región seleccionada
  const getStrokeColor = (regionName) => {
    return regionName === selectedRegion ? "rgba(0,128,0,1)" : "rgba(51,136,255,1)";
  };

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
        // OnPress para quitar la región seleccionada al clickear fuera de las regiones
        onPress={() => {
          setSelectedRegionState(null);
          setSelectedRegion(null);
        }}
      >
        {/* Renderiza las regiones individualmente, en vez de todas como una entidad */}
        {geoJsonData.features.map((feature, index) => (
          <Geojson
            key={index}
            tappable={true}
            geojson={{
              type: "FeatureCollection",
              features: [feature],
            }}
            // Se colorean los bordes según los getters
            strokeColor={getStrokeColor(feature.properties.Region)}
            fillColor={getFillColor(feature.properties.Region)}
            strokeWidth={1}
            onPress={() => {
              setSelectedRegionState(feature.properties.Region);
              setSelectedRegion(feature.properties.Region);
            }}
          />
        ))}
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
