import { ScrollView, StyleSheet } from 'react-native';
import Botao from '@/src/components/Botao';
import CampoPesquisa from '@/src/components/CampoPesquisa';
import CardLista from '@/src/components/maquinas/ListaCards';
import Titulo from '@/src/components/Titulo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Maquinas() {

    const [nomeUnidade, setNomeUnidade] = useState<string | null>('');
    const [filtroPesquisa, setFiltroPesquisa] = useState('');
    const [filtroOrdenacao, setFiltroOrdenacao] = useState('');
    
    const filtrosOrdenacao = [
        { nome: "Tipo", valor: "tipo" },
        { nome: "Tipo Insumo", valor: "tipo_insumo" },
        { nome: "Vida Útil", valor: "vida_util" },
        { nome: "Modelo", valor: "modelo" },
        { nome: "Data de Compra", valor: "data_compra" },
        { nome: "Potência", valor: "potencia" },
        { nome: "Valor", valor: "valor" },
        { nome: "Consumo Médio", valor: "consumo_medio" },
    ]
    
    //exibir unidade logada
    useEffect(() => {
        const buscarNomeUnidade = async () => {
            try {
                const unidadeNome = await AsyncStorage.getItem("unidadeNome");
                setNomeUnidade(unidadeNome);
            } catch (error) {
                console.error("Erro ao buscar o nome da unidade:", error);
            }
        };
        buscarNomeUnidade();
    }, []);
    
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: -23}}>
            <Stack.Screen 
                options={{
                    headerLeft: () => (
                        <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.replace('/restricted')} />
                    ),
                    title: `\t\t\t\t ${nomeUnidade}` || "",
                }} 
            />

            <ScrollView contentContainerStyle={styles.scrollContent} >
                <Titulo titulo="Máquinas e Implementos" />
                <CampoPesquisa setFiltro={setFiltroPesquisa} />
                <Botao nome="Adicionar" rota="/restricted/maquinas/criar" disabled={false}/>
                <ScrollView 
                    contentContainerStyle={styles.containerFiltros} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        filtrosOrdenacao.map(
                            (item) => 
                                <Botao 
                                    nome={item.nome}
                                    key={item.valor}
                                    onPress={() => setFiltroOrdenacao(item.valor)} 
                                />
                        )
                    }
                </ScrollView>
                <CardLista filtroPesquisa={filtroPesquisa} filtroOrdenacao={filtroOrdenacao} />
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