import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function CataniaMapView() {
  const initialRegion = {
    latitude: 37.5024,  // Catania
    longitude: 15.0873,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion} >
        <Marker
          coordinate={{ latitude: 37.5024, longitude: 15.0873 }}
          title="Catania"
          description="This is Catania"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});