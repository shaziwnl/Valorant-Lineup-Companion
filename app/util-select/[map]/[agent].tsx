import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native'
import AgentUtil from '@/components/AgentUtil';

function Agent() {

    const { agent, map } = useLocalSearchParams();
    
    return (
        <AgentUtil map={map as string} agent={agent as string}/>
    )
    
}

export default Agent