import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

//import SimpleMap from "./components/Map";
import Birds from "./components/Birds";

function App() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Aves en Chile</Text>
        <Birds selectedRegion={"Región de Los Lagos"} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
});

export default App;