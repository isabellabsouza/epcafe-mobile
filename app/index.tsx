import ButtonLink from '@/components/ButtonLink';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { View, StyleSheet, Text, Image } from 'react-native';
 
export default function App() {
    return (
        <View style={styles.container}>
            <Text>Bem Vindo ao èpCafé! </Text>

            <Image 
                source={require('../assets/logo.png')}     
            />

            
            <ButtonLink route="/login" title="Fazer Login" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

