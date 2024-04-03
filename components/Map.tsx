import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Map(props: any) {

    const mapImages: any = {
        Ascent: require('../assets/images/maps/Ascent.png'),
        Bind: require('../assets/images/maps/Bind.png'),
        Lotus: require('../assets/images/maps/Lotus.png'),
        Pearl: require('../assets/images/maps/Pearl.png'),
        Haven: require('../assets/images/maps/Haven.png'),
        Icebox: require('../assets/images/maps/Icebox.png'),
        Breeze: require('../assets/images/maps/Breeze.png'),
        Fracture: require('../assets/images/maps/Fracture.png'),
        Split: require('../assets/images/maps/Split.png'),
    }

    return (
        <Link href={`/agent-select/${props.name}`}>
            <View style={{width:"100%"}}>
                <Image style={styles.image} source={mapImages[props.name]} />
                <Text style={styles.title}>{props.name.toUpperCase()}</Text>
            </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    
    title: {
        fontFamily: 'Valorant',
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'white',
        // textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 25,

    },

    image: {
        width: 300,
        height: 150,
    }
});
