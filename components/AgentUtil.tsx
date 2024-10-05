import { View, Text, StyleSheet, Image, ImageBackground, Platform, ImageURISource } from 'react-native';
import { Link } from 'expo-router';
import agentImages from '@/utils/agentList';
import mapImages from '@/utils/mapList';
import agentUtilityList from '@/utils/agentUtilityList';
import {vh, vw} from '@/utils/dimensions';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { AgentUtilProps } from '@/interfaces/props/AgentUtilProps';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : Platform.OS == 'android'
                         ? 'ca-app-pub-8591491079519050/7462327433' : 'ca-app-pub-8591491079519050/3639149419';

                       
export default function AgentUtil(props: AgentUtilProps) {

    return (
        <ImageBackground source={require('../assets/images/wallpaper.jpg')} style={styles.wallpaper}>

            <View style={styles.container}>
                <Image style={styles.agentImage} source={agentImages[props.agent]} />    
                <Image style={styles.mapImage} source={mapImages[props.map]} />                
            </View>

            <View style={styles.container2}>
                {agentUtilityList[props.agent]?.map((utility: [ImageURISource, string]) => {
                    const path = utility[1]
                    const parts = path.split("/");
                    const filename = parts[parts.length - 1]; // Get the last part after splitting by '/'
                    const abilityName = filename.split(".")[0]; // Get the part before the extension by splitting by '.'
                    return (
                        <View key={abilityName} style={styles.utilItem}>
                            <Link style={{}} href={`/${props.map}/${props.agent}/${abilityName}/`}>
                                <View key={abilityName} style={styles.utilityWrapper}>
                                    <Image style={styles.utilImage} source={utility[0]} />
                                    <Text style={[styles.title]}>{abilityName.toUpperCase()}</Text>
                                </View>
                            </Link>
                        </View>
                    )
                })}

                
            </View>
            <View style={{marginTop: "auto", backgroundColor: 'rgba(0, 0, 0, 0.7)',}}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                />
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
        // paddingHorizontal: vh * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: vw * 0.05,
        paddingLeft: 15,
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
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        // backgroundColor: 'rgba(225, 225, 225, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: vh * 0.015,
    },

    container2: {
        // paddingTop: vh * 0.04,
        flex: 7,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
    },

    agentImage: {
        width: vw * 0.25,
        height: vh * 0.25,
    },

    mapImage: {
        width: vw * 0.70,
        height: vh * 0.25,
        borderRadius: 20,
        borderLeftWidth: 1,
        borderWidth: 1,
        
    },

    wallpaper: {
        width: '100%',
        height: '100%',
    },

    utilItem: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: vw,
        padding: 10,
    }
})
