import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Agent from '@/components/Agent';
import { Link, useLocalSearchParams } from 'expo-router';

export default function AgentSelect() {
    
    const AgentList =   [
                        'Astra',    'Breach',  'Brimstone',
                        'Chamber',  'Clove',   'Cypher',
                        'Deadlock', 'Fade',    'Gekko',
                        'Harbor',   'Iso',     'Jett',
                        'Kayo',     'Killjoy', 'Neon',
                        'Omen',     'Phoenix', 'Raze',
                        'Reyna',    'Sage',    'Skye',
                        'Sova',     'Viper',   'Yoru'
                        ]

    const { map } = useLocalSearchParams();
    const image = require('../../assets/images/wallpaper.jpg');

    return (
        <ImageBackground source={image} style={{width: '100%', height: '100%'}}>
            <ScrollView>
                <View style={styles.container}>
                {AgentList.map((agentName) => (
                    <Link key={agentName} href={`/lineups/${map}/${agentName}`}>
                        <Agent name={agentName}/>
                    </Link>
                ))}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },

    container: {
        flex: 1,
        paddingVertical: 20,
        flexWrap: 'wrap',
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'transparent',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    
})
