import { useState } from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import Birds from "./components/Birds";

// Para que funcione en Web se debe reemplazar el segundo require por el []; 
let Map = Platform.OS === "web"
  ? require("./components/MapWeb").default
  : require("./components/MapMobile").default;

function App() {
  const [selectedRegion, setSelectedRegion] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.logo}
        />
      </View>

      {Platform.OS === "web" ? (
        <View style={styles.grid}>
          <View style={styles.mapContainer}>
            <Map setSelectedRegion={setSelectedRegion} />
          </View>
          <View style={styles.birdsContainer}>
            <Birds selectedRegion={selectedRegion} />
          </View>
        </View>
      ) : (
        <>
          <Map setSelectedRegion={setSelectedRegion} />
          <Birds selectedRegion={selectedRegion} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  imageContainer: {
    backgroundColor: "#add8e6",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
  },
  logo: {
    width: 130,
    height: 50,
  },
  grid: {
    flex: 1,
    flexDirection: "row",
  },
  mapContainer: {
    flex: 1,
    padding: 10,
  },
  birdsContainer: {
    flex: 1,
    padding: 10,
  },
});

export default App;
