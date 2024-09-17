import { View, Text, StyleSheet, Image } from 'react-native';
import agentImages from '@/utils/agentList';
import { vw, vh } from '@/utils/dimensions'

export default function Agent(props: {name: string}) {

    return (
        <View>
            <Image style={styles.image} source={agentImages[props.name]} />
            <Text style={styles.title}>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    
    title: {
        fontSize: vh * 0.025,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Valorant',
        paddingTop: vh * 0.015,
        textShadowColor: 'white',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 25,
    },

    image: {
        width: vw * 0.38,
        height: vh * 0.35,
    }
});
