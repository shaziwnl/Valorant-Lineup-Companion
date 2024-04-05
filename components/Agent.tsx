import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';
import agentImages from '@/utils/agentList';

export default function Map(props: any) {

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
