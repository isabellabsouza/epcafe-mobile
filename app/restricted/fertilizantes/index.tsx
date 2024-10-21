import Botao from "@/components/Botao";
import CampoPesquisa from "@/components/CampoPesquisa";
import CardLista from "@/components/fertilizantes/ListaCards";
import Titulo from "@/components/Titulo";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Fertilizantes() {

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
                <Titulo titulo="Fertilizantes e Defensivos" />
                <CampoPesquisa />
                <Botao nome="Adicionar" rota="/restricted/fertilizantes/criar" disabled={false}/>
                <ScrollView 
                    contentContainerStyle={styles.containerFiltros} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* {
                        filtrosOrdenacao.map(
                            (item) => <Botao nome={item.nome} rota="/restricted/maquinas" key={item.nome} disabled={false} />
                        )
                    } */}
                </ScrollView>
                <CardLista />
            </ScrollView>

            
        </SafeAreaView>
    )
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