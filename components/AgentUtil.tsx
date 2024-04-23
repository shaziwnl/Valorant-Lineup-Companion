import { View, Text, StyleSheet, Image, ImageBackground, Platform } from 'react-native';
import { Link } from 'expo-router';
import agentImages from '@/utils/agentList';
import mapImages from '@/utils/mapList';
import agentUtilityList from '@/utils/agentUtilityList';
import {vh, vw} from '@/utils/dimensions';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : Platform.OS == 'android'
                         ? 'ca-app-pub-8591491079519050/7462327433' : 'ca-app-pub-8591491079519050/3639149419';

                       
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
                        <Link key={index} href={`/get-lineups/${props.map}/${props.agent}/${abilityName}`}>
                            <View key={index} style={styles.utilityWrapper}>
                                <Image style={styles.utilImage} source={utility[0]} />
                                <Text style={[styles.title]}>{abilityName.toUpperCase()}</Text>
                            </View>
                        </Link>
                    )
                })}

                <View style={{marginTop: "auto"}}>
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    />
                </View>
            </View>

            

        </ImageBackground>  
    );
};

const styles = StyleSheet.create({

    utilImage: {
        width: vw * 0.15,
        height: vh * 0.075,
    },

    utilityWrapper: {
        paddingHorizontal: vh * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        gap: vh * 0.05,
    },

    title: {
        fontSize: vh * 0.0375,
        fontFamily: 'Valorant',
        fontWeight: "600",
        color: 'white',
        textAlign: 'center',
    },

    container: {
        flex: 3,
        flexWrap: 'wrap',
        gap: vw * 0.03,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container2: {
        paddingTop: vh * 0.04,
        flex: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        gap: vh * 0.05,
    },

    agentImage: {
        width: vw * 0.25,
        height: vh * 0.25,
    },

    mapImage: {
        // width: 250,
        width: vw * 0.65,
        height: vh * 0.2,
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 2,
    },


    wallpaper: {
        width: '100%',
        height: '100%',
    }
})
