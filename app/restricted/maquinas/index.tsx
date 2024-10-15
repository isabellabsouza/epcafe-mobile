import ButtonLink from '@/components/ButtonLink';
import { Text, View, StyleSheet, ScrollView} from 'react-native';

import CardLista from '@/components/CardLista';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Titulo from '@/components/Titulo';
import CampoPesquisa from '@/components/CampoPesquisa';
import Botao from '@/components/Botao';
import Card from '@/components/Card';

export default function Maquinas() {

    function goBack() {
        router.replace('/restricted');
    }

    const filtrosOrdenacao = [
        { nome: "Nome" },
        { nome: "Vida Útil" },
        { nome: "Modelo" },
        { nome: "Data de Compra" },
    ]
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: -23}}>
            <Stack.Screen 
                options={{
                    headerLeft: () => (
                        <AntDesign name="arrowleft" size={24} color="black" onPress={goBack} />
                    ),
                    title: "\t\t\t\tMaquinas",
                }} 
            />

            <ScrollView contentContainerStyle={styles.scrollContent} >
                <Titulo titulo="Máquinas e Implementos" />
                <CampoPesquisa />
                <Botao nome="Adicionar" rota="/restricted/maquinas/criar"/>
                <ScrollView 
                    contentContainerStyle={styles.containerFiltros} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        filtrosOrdenacao.map(
                            (item) => <Botao nome={item.nome} rota="/restricted/maquinas" key={item.nome} />
                        )
                    }
                </ScrollView>
                <CardLista />
            </ScrollView>

            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    
    scrollContent: {
        padding: 17,
        flexGrow: 1, 
    },
    containerFiltros: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
        gap: 10,
        //marginVertical: 10,
    }
    
})