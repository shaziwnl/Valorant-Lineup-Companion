import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Agent from '@/components/Agent';
import { Link, useLocalSearchParams } from 'expo-router';
import { vh, vw } from '@/utils/dimensions';

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
                    <Link key={agentName} href={`/util-select/${map}/${agentName}`}>
                        <Agent name={agentName}/>
                    </Link>
                ))}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingVertical: vh * 0.025,
        flexWrap: 'wrap',
        gap: vh * 0.04,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    
})
