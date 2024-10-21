import { ScrollView, StyleSheet } from 'react-native';
import Botao from '@/components/Botao';
import CampoPesquisa from '@/components/CampoPesquisa';
import CardLista from '@/components/CardLista';
import Titulo from '@/components/Titulo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Maquinas() {

    const [nomeUnidade, setNomeUnidade] = useState<string | null>('');

    useEffect(() => {
        const fetchNomeUnidade = async () => {
            try {
                const unidadeNome = await AsyncStorage.getItem("unidadeNome");
                setNomeUnidade(unidadeNome);
            } catch (error) {
                console.error("Erro ao buscar o nome da unidade:", error);
            }
        };
        fetchNomeUnidade();
    }, []);

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
                    title: `\t\t\t\t ${nomeUnidade}` || "",
                }} 
            />

            <ScrollView contentContainerStyle={styles.scrollContent} >
                <Titulo titulo="Máquinas e Implementos" />
                <CampoPesquisa />
                <Botao nome="Adicionar" rota="/restricted/maquinas/criar" disabled={false}/>
                <ScrollView 
                    contentContainerStyle={styles.containerFiltros} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        filtrosOrdenacao.map(
                            (item) => <Botao nome={item.nome} rota="/restricted/maquinas" key={item.nome} disabled={false} />
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
    }
})