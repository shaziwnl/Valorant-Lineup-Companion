import { StyleSheet, ImageBackground, Text } from 'react-native';
import { View } from '@/components/Themed';
import { vw, vh } from '@/utils/dimensions'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';

const image = require('@/assets/images/wallpaper.jpg');

export default function TabOneScreen() {

  return (
    <SafeAreaView>
      <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
        <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View style={styles.container1}>
            <Text style={[{fontFamily: "Valorant", fontSize: 35, color: "white", marginBottom: 25}, styles.welcome]}>Welcome Agent</Text>
            <CustomButton title="Browse Lineups" variant='default' href={`/mapselect/`}/>          
            <CustomButton title="Saved Lineups"  variant='light' href={`/savedlineups/`}/>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  welcome: {
    textShadowColor: '#ff4655',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 7,
  },

  container2: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: vh * 0.05,
    justifyContent: 'center',
    paddingVertical: vh * 0.05,
  },

  container1: {
    backgroundColor: "(0, 0, 0, 1)",
    display: 'flex',
    alignItems: 'center',
    marginTop: "auto",
    marginBottom: "auto",
    gap: vh * 0.01,
  },

});
