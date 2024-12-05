import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal, ScrollView, Platform } from 'react-native';
import useFetchBirds from '../hooks/useFetchBirds';
import useFetchBirdData from '../hooks/useFetchBirdData';
import regionsData from '../mocks/regionsData.json';

const Birds = ({ selectedRegion }) => {
  const { data, isLoading, error } = useFetchBirds();
  const [selectedBirdUid, setSelectedBirdUid] = useState();
  // Se define con : para que no se repita el valor de data, isLoading y error;
  const { data: birdData, isLoading: isBirdLoading, error: birdError } = useFetchBirdData(selectedBirdUid);
  const [modalVisible, setModalVisible] = useState(false);

   // sirve para obtener las regiones de las aves y compararlas con la región seleccionada
  const getBirdRegions = (birdUid) =>
    regionsData.find(region => region.uid === birdUid).regions.join();

  if (isLoading) {
    return <Text style={styles.loadingText}>Cargando aves...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Ha ocurrido un error: {error.message}</Text>;
  }

  // Filtra las aves que habitan en la región seleccionada, si no hay aves en la para filtrar, retorna []
  const birds = data ? data.filter(bird => getBirdRegions(bird.uid).includes(selectedRegion)) : [];

  // Si no se ha elegido ninguna regió muestra un mensaje default
  if (birds.length === 0) {
    return <Text style={styles.infoText}>Seleccione una región para ver las aves que habitan en ella.</Text>;
  }

  // Función para obtener los estilos correspondientes de la plataforma
  const getPlatformStyle = (webStyle, mobileStyle) => {
    return Platform.OS === 'web' ? webStyle : mobileStyle;
  };

  // Verifica si la plataforma es web o mobile para aplicar los estilos correspondientes
  const imageStyle = getPlatformStyle(styles.webImage, styles.mobileImage);
  const modalStyle = getPlatformStyle(styles.webModal, styles.mobileModal);
  const modalImageStyle = getPlatformStyle(styles.webModalImage, styles.mobileModalImage);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Aves en la {selectedRegion}</Text>
      <FlatList
        data={birds}
        numColumns={2}
        renderItem={({ item: bird }) => (
          // Muestra la información de las aves como una tarjeta
          <View style={styles.card}>
            <Image source={{ uri: bird.images.thumb }} style={imageStyle} />
            <Text style={styles.birdName}>{bird.name.spanish}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setSelectedBirdUid(bird.uid);
                setModalVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Ver más Info</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={[styles.modalBackground]}>
          <View
            style={[styles.modalContent, modalStyle]}
          >
            {isBirdLoading ? (
              <Text style={styles.loadingText}>Cargando...</Text>
            ) : birdError ? (
              <Text style={styles.errorText}>Ha ocurrido un error: {birdError.message}</Text>
            ) : (
              birdData && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  <Image source={{ uri: birdData.images.main }} style={modalImageStyle} />
                  <Text style={styles.modalTitle}>{birdData.name.spanish}</Text>
                  <Text style={styles.modalBadge}>{birdData.species}</Text>
                  <Text style={styles.sectionTitle}>Descripción:</Text>
                  <Text style={styles.sectionText}>
                    {birdData.iucn.description ? birdData.iucn.description : 'No hay una descripción'}
                  </Text>
                  <Text style={styles.sectionTitle}>Hábitat:</Text>
                  <Text style={styles.sectionText}>
                    {birdData.habitat ? birdData.habitat : 'No hay información sobre su hábitat'}
                  </Text>
                </ScrollView>
              )
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Regresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  webImage: {
    width: '37vh',
    height: '37vh',
    borderRadius: 8,
  },
  mobileImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  birdName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#ff4081',
    color: '#ffffff',
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#ff4081',
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#ffffff',
  },  
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
  },
  webModal: {
    width: '35%',
    height: '100%',
    alignSelf: 'flex-end',
  },
  mobileModal: {
    width: '100%',
    height: '100%',
  },
  webModalImage: {
    width: '65vh', 
    height: '65vh', 
    resizeMode: 'contain',
    borderRadius: 8,
  },
  mobileModalImage: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: '600',
    marginVertical: 8,
  },
  modalBadge: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
    backgroundColor: '#ff4081',
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',

  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 16,
  },
  sectionText: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default Birds;
