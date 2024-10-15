import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { CountdownCircleTimer, useCountdown } from 'react-native-countdown-circle-timer';
import {BlurView} from '@react-native-community/blur';

const colors = [
    '#37C536',
    '#37C536',
    '#F7B801',
    '#BD1B1E',
    '#BD1B1E',
]

const image = require('@/assets/images/wallpaper.jpg');
const middle = require('@/assets/images/misc/spike-timer.jpg');

const Timer: React.FC = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [key, setKey] = useState(0);

    return (
        
        <ImageBackground source={image} style={{width: '100%', height: '100%'}}>

            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={5}
                reducedTransparencyFallbackColor="white"
            />

            <View style={styles.container}>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={isPlaying}
                    duration={45}
                    colors={colors as any}
                    colorsTime={[45,30,20,7,0]}
                    size={300}
                    strokeWidth={18}
                >
                
                {({remainingTime}) => {
                    return (
                        <View style={{backgroundColor:"black", borderRadius: 250, width: 250, height: 250, overflow: 'hidden'}}>
                            <ImageBackground source={image} style={{width: '100%', height: '100%', borderRadius: 200}}>
                            <Text style={styles.time}>{remainingTime}</Text>
                            </ImageBackground>
                        </View>
                    )
                }}
                </CountdownCircleTimer>
            </View>

            <Button title='Pause' onPress={() => { setIsPlaying(false) }}></Button>
            <Button title='Start' onPress={() => { setIsPlaying(true) }}></Button>
            <Button title='Reset' onPress={() => { setKey(prev => prev + 1)}}></Button>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: 'auto', marginTop: 220
    },

    time: {
        marginTop:'auto',
        marginBottom: 'auto',
        alignSelf: 'center',
        fontSize: 100,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
    },


    circle: {
        backgroundColor:"black", 
        borderRadius: 250,
        width: 250,
        height: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    blurContainer: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});

export default Timer;

