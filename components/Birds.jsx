import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal, ScrollView, Platform } from 'react-native';
import useFetchBirds from '../hooks/useFetchBirds';
import useFetchBirdData from '../hooks/useFetchBirdData';
import regionsData from '../mocks/regionsData.json';

const Birds = ({ selectedRegion }) => {
  const { data, isLoading, error } = useFetchBirds();
  const [selectedBirdUid, setSelectedBirdUid] = useState();
  const { data: birdData, isLoading: isBirdLoading, error: birdError } = useFetchBirdData(selectedBirdUid);
  const [modalVisible, setModalVisible] = useState(false);

  const getBirdRegions = (birdUid) =>
    regionsData.find(region => region.uid === birdUid).regions.join();

  if (isLoading) {
    return <Text style={styles.loadingText}>Cargando aves...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Ha ocurrido un error: {error.message}</Text>;
  }

  const birds = data ? data.filter(bird => getBirdRegions(bird.uid).includes(selectedRegion)) : [];

  if (birds.length === 0) {
    return <Text style={styles.infoText}>Seleccione una región para ver las aves que habitan en ella.</Text>;
  }

  const getModalStyle = () => {
    if (Platform.OS === 'web') {
      return styles.webModal;
    }
    return styles.mobileModal;
  };

  const getImageStyle = () => {
    if (Platform.OS === 'web') {
      return styles.webImage;
    }
    return styles.mobileImage;
  };

  const getModalImageStyle = () => {
    if (Platform.OS === 'web') {
      return styles.webModalImage;
    }
    return styles.mobileModalImage;
  };

  const numColumns = Platform.OS === 'web' ? 4 : 2;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Aves en la {selectedRegion}</Text>
      <FlatList
        data={birds}
        numColumns={numColumns}
        renderItem={({ item: bird }) => (
          <View style={styles.card}>
            <Image source={{ uri: bird.images.thumb }} style={getImageStyle()} />
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
            style={[styles.modalContent, getModalStyle()]}
          >
            {isBirdLoading ? (
              <Text style={styles.loadingText}>Cargando...</Text>
            ) : birdError ? (
              <Text style={styles.errorText}>Ha ocurrido un error: {birdError.message}</Text>
            ) : (
              birdData && (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                  <Image source={{ uri: birdData.images.main }} style={ getModalImageStyle()} />
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
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
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  webImage: {
    width: 250,
    height: 250,
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
    width: '100%', 
    height: '150%', 
    resizeMode: 'contain',
    borderRadius: 8,
  },
  mobileModalImage: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 8,
  },
  modalBadge: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    backgroundColor: '#ff4081',
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  sectionText: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default Birds;