import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';
import mapImages from '@/utils/mapList';
import { vw, vh } from '@/utils/dimensions'
import { MapProps } from '@/interfaces/props/MapProps';

export default function Map(props: MapProps) {
        
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
        marginTop: vh * 0.01,
        fontSize: vh * 0.025,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'white',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 25,
    },

    image: {
        width: vw * 0.77,
        // width: 300,
        height: vh * 0.18,
    }
});
