import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';
import mapImages from '@/utils/mapList';

export default function Map(props: any) {

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
