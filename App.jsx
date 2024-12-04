import { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Birds from "./components/Birds";

// AYUDA ESTA COSA ES HORRIBLE NO ENTIENDO AAAAAAAAAAAAAAAAAAAAAAAAA
let Map = Platform.OS === 'web' 
  ? require('./components/MapWeb').default
  : require('./components/MapMobile').default;

function App() {
  const [selectedRegion, setSelectedRegion] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aves en Chile</Text>
      {Platform.OS === 'web' ? (
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
    padding: 10

  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center"
  },
  grid: {
    flex: 1,
    flexDirection: "row"
  },
  mapContainer: {
    flex: 1,
    padding: 10
  },
  birdsContainer: {
    flex: 1,
    padding: 10
  }
});

export default App;
