import { ScrollView, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import Map from '@/components/Map';


export default function TabOneScreen() {

  const MapList = ['Ascent', 'Bind', 'Lotus', 'Breeze', 'Split', 'Haven', 'Fracture', 'Pearl', 'Icebox'];

  return (
    <ScrollView>
      <View style={styles.container}>
      {MapList.map((mapName) => (
        <Map key={mapName} name={mapName}/>
      ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingVertical: 20,
    flexWrap: 'wrap',
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
