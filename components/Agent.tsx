import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Map(props: any) {

    const agentImages: any = {
        Astra: require('../assets/images/agents/Astra.png'),
        Brimstone: require('../assets/images/agents/Brimstone.png'),
        Clove: require('../assets/images/agents/Clove.png'),
        Harbor: require('../assets/images/agents/Harbor.png'),
        Iso: require('../assets/images/agents/Iso.png'),
        Jett: require('../assets/images/agents/Jett.png'),
        Omen: require('../assets/images/agents/Omen.png'),
        Viper: require('../assets/images/agents/Viper.png'),
        Yoru: require('../assets/images/agents/Yoru.png'),
        Sage: require('../assets/images/agents/Sage.png'),
        Skye: require('../assets/images/agents/Skye.png'),
        Sova: require('../assets/images/agents/Sova.png'),
        Breach: require('../assets/images/agents/Breach.png'),
        Deadlock: require('../assets/images/agents/Deadlock.png'),
        Chamber: require('../assets/images/agents/Chamber.png'),
        Gekko: require('../assets/images/agents/Gekko.png'),
        Kayo: require('../assets/images/agents/Kayo.png'),
        Neon: require('../assets/images/agents/Neon.png'),
        Phoenix: require('../assets/images/agents/Phoenix.png'),
        Raze: require('../assets/images/agents/Raze.png'),
        Reyna: require('../assets/images/agents/Reyna.png'),
        Fade: require('../assets/images/agents/Fade.png'),
        Cypher: require('../assets/images/agents/Cypher.png'),
        Killjoy: require('../assets/images/agents/Killjoy.png'),
    }

    return (
        <View>
            <Image style={styles.image} source={agentImages[props.name]} />
            <Text style={styles.title}>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Valorant',
        paddingTop: 10,
        textShadowColor: 'white',
        // textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 25,
    },

    image: {
        width: 150,
        height: 300,
    }
});
