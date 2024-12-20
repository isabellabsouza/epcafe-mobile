import Botao from '@/src/components/Botao';
import Titulo from '@/src/components/Titulo';
import { supabase } from '@/src/lib/supabase';
import { Image, StyleSheet, View } from 'react-native';
 
export default function App() {

    function logOut() {
        supabase.auth.signOut();
    }
    return (
        
        <View style={styles.container}>
            <Titulo titulo="èpCafé" />

            <Image 
                source={require('@/assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"     
            />
            
            <Botao rota="/login" nome="Fazer Login" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginVertical: 30,
    }
})

