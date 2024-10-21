import Botao from '@/components/Botao';
import ButtonLink from '@/components/ButtonLink';
import { supabase } from '@/lib/supabase';
import { Image, StyleSheet, Text, View } from 'react-native';
 
export default function App() {

    function logOut() {
        supabase.auth.signOut();
    }
    return (
        
        <View style={styles.container}>
            <Text>Bem Vindo ao èpCafé! </Text>

            <Image 
                source={require('../assets/logo.png')}     
            />

            
            <Botao rota="/login" nome="Fazer Login" />
            <Botao nome="Sair" onPress={logOut} disabled={false} />
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

