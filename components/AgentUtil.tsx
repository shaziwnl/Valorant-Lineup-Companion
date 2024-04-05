import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import agentImages from '@/utils/agentList';
import mapImages from '@/utils/mapList';
import agentUtilityList from '@/utils/agentUtilityList';

export default function AgentUtil(props: any) {

    

    return (
        <ImageBackground source={require('../assets/images/wallpaper.jpg')} style={styles.wallpaper}>

            <View style={styles.container}>
                <Image style={styles.agentImage} source={agentImages[props.agent]} />
                <Image style={styles.mapImage} source={mapImages[props.map]} />
            </View>

            <View style={styles.container2}>
                {agentUtilityList[props.agent]?.map((utility: any, index: number) => {
                    const path = utility[1]
                    const parts = path.split("/");
                    const filename = parts[parts.length - 1]; // Get the last part after splitting by '/'
                    const abilityName = filename.split(".")[0]; // Get the part before the extension by splitting by '.'
                    return (
                        <View key={index} style={styles.utilityWrapper}>
                            <Image style={styles.utilImage} source={utility[0]} />
                            <Text style={[styles.title, styles.title2]}>{abilityName.toUpperCase()}</Text>
                        </View>
                    )
                })}
            </View>

        </ ImageBackground>  
    );
};

const styles = StyleSheet.create({

    utilImage: {
        width: 60,
        height: 60,
    },

    utilityWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    title2: {
        fontSize: 40,
        fontFamily: 'Valorant',
        fontWeight: "600",
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    container: {
        flex: 3,
        flexWrap: 'wrap',
        gap: 15,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container2: {
        paddingTop: 25,
        flex: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        gap: 50,
    },

    agentImage: {
        width: 100,
        height: 200,
    },

    mapImage: {
        width: 250,
        height: 175,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 2,
    },


    wallpaper: {
        width: '100%',
        height: '100%',
    }
})
