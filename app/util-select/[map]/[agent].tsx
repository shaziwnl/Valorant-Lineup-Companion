import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native'
import AgentUtil from '@/components/AgentUtil';

function Agent() {

    const { agent, map } = useLocalSearchParams();
    
    return (
        <AgentUtil map={map} agent={agent}/>
    )
    
}

export default Agent

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
    },
})