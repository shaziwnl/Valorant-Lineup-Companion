import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { CountdownCircleTimer, useCountdown } from 'react-native-countdown-circle-timer';

const colors = [
    '#004777',
    '#F7B801',
    '#A30000',
]

const image = require('@/assets/images/wallpaper.jpg');

const Timer: React.FC = () => {

    const {
        path,
        pathLength,
        stroke,
        strokeDashoffset,
        remainingTime,
        elapsedTime,
        size,
        strokeWidth,
      } = useCountdown({ isPlaying: true, duration: 45, colors: colors as any })

    return (
        <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
            <CountdownCircleTimer
                isPlaying
                duration={45}
                colors={colors as any}
                colorsTime={[6,3,0]}
                size={300}
                
            >
            {({remainingTime}) => <Text>{remainingTime}</Text>}
            </CountdownCircleTimer>
            </View>
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
        fontSize: 48,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
});

export default Timer;