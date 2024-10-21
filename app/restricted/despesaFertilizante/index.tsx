import Botao from "@/components/Botao";
import CampoPesquisa from "@/components/CampoPesquisa";
import ListaCards from "@/components/depesaFertilizante/ListaCards";
import Titulo from "@/components/Titulo";
import { despesasFertilizantesCollection } from "@/db";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";



export default function NovaDespesaFertilizante() {
    
    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const despesas = await despesasFertilizantesCollection.query().fetch();
                console.log(despesas);
            } catch (error) {
                console.error("Erro ao buscar o tenant:", error);
            }
        };
        fetchTenant();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: -23}}>
            <Stack.Screen 
                options={{
                    headerLeft: () => (
                        <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.replace('/restricted')} />
                    ),
                    title: "\t\t\t\tDespesas",
                }} 
            />

            <ScrollView contentContainerStyle={styles.scrollContent} >
                <Titulo titulo="Despesas com Fertilizantes e Defensivos" />
                <CampoPesquisa />
                <Botao nome="Adicionar" rota="/restricted/despesaFertilizante/criar" disabled={false}/>
                <ScrollView 
                    contentContainerStyle={styles.containerFiltros} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* {
                        filtrosOrdenacao.map(
                            (item) => <Botao nome={item.nome} rota="/restricted/fertilizantes" key={item.nome} disabled={false} />
                        )
                    } */}
                </ScrollView>
                <ListaCards />
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
    }
})