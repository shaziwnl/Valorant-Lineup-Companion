import { View, Text, StyleSheet, ScrollView, ImageBackground, Platform, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import {vh, vw} from '@/utils/dimensions';
import Checkbox from '@/components/Checkbox';
import React, { useEffect, useState } from 'react';
import videoLinks from '@/utils/links';
import SingleVideo from '@/components/SingleVideo';
import { VideoLink } from '@/interfaces/VideoLink';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : Platform.OS == 'android' ? 
                'ca-app-pub-8591491079519050/6514583321' : 'ca-app-pub-8591491079519050/1629922300'

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['valorant', 'lineups', 'gaming', 'esports'],    
});

const bg = require('@/assets/images/wallpaper.jpg');

const Videos: React.FC = () => {
    const { map, agent, utility } = useLocalSearchParams();
    const [arr, setArr] = useState(videoLinks[map as string][agent as string][utility as string])
    const [loaded, setLoaded] = useState(false);
    const [timesClicked, setTimesClicked] = useState<number>(0);
    const [filters, setFilters] = useState({
        aSite: true,
        bSite: true,
        cSite: true,
        middle: true,
        attack: true,
        defense: true,
    });

    useEffect(() => {
        const loadTimesClicked = async () => {
            try {
                const value = await AsyncStorage.getItem('timesClicked');
                if (value !== null) {
                    setTimesClicked(parseInt(value));
                }
            } catch (e) {
                console.log(e);
            }
        }
        loadTimesClicked();
    }, [])

    useEffect(() => {
        const loaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
            console.log("ad loaded")
        })
        interstitial.load();
        return loaded
    }, []);

    useEffect(() => {
        const close = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            setLoaded(false);
            console.log("ad closed");
            interstitial.load();
        })
        return close
    }, []);

    useEffect(() => {
        setArr(videoLinks[map as string][agent as string][utility as string])
        if (arr) {
            if (!filters.aSite) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("a site"))) }
            if (!filters.bSite) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("b site"))) }
            if (!filters.cSite) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("c site"))) }
            if (!filters.middle) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("middle"))) }
            if (!filters.attack) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("attack"))) }
            if (!filters.defense) { setArr((arr: Array<VideoLink>) => arr.filter((item) => !item.title.toLowerCase().includes("defense"))) }   
        }
    }, [filters])

    useEffect(() => {
        if (timesClicked % 8 === 0 && timesClicked !== 0) {
            showAd();
        }
        console.log(timesClicked);
    }, [timesClicked])

    function showAd() {
        if (loaded) 
        { interstitial.show() }
    }

    async function incrementTimesClicked() {
        let newTimesClicked = timesClicked + 1;
        if (newTimesClicked == 48) { newTimesClicked = 8 }
        await AsyncStorage.setItem('timesClicked', newTimesClicked.toString());
        setTimesClicked(newTimesClicked);
    }

    
    return (
        <ImageBackground source={bg} style={{width: '100%', height: '100%'}}>
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.70)', height: "100%", width: '100%'}}>
                <View style={styles.container}>
                    <Text style={styles.text}>{utility} Lineups on {map}</Text>
                    <View style={styles.checkboxesContainer}>
                        <Checkbox text="A Site" filters={filters} setFilters={setFilters} property="aSite" />
                        <Checkbox text="B Site" filters={filters} setFilters={setFilters} property="bSite" />
                        <Checkbox text="C Site" filters={filters} setFilters={setFilters} property="cSite" />
                        <Checkbox text="Middle" filters={filters} setFilters={setFilters} property="middle" />
                        <Checkbox text="Attack" filters={filters} setFilters={setFilters} property="attack" />
                        <Checkbox text="Defense" filters={filters} setFilters={setFilters} property="defense" />
                    </View>
                </View>

                <ScrollView>
                    {arr?.map((item: VideoLink) => {
                        const words = item.title.split(" ");
                        const title = words.slice(2).join(" ");
                        return (
                        <View key={item.id} style={styles.videoContainer}>
                            <SingleVideo key={item.id} title={title} videoId={item.id} map={map as string}
                                         agent={agent as string} utility={utility as string} saved={false}
                                         increment={incrementTimesClicked}/>
                        </View>
                        )
                    })}
                </ScrollView>
                {/* <Button color='black' title='Show ad' onPress={incrementTimesClicked}></Button> */}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        borderTopColor: 'white',
        borderTopWidth: 2,
    },

    videoContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: vh * 0.02,
    },

    text: {
        marginTop: vh * 0.02,
        fontSize: vh * 0.025,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },

    checkboxesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: vw * 0.03,
        padding: vw * 0.025,
    },

});

export default Videos;