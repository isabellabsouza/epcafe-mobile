import Botao from "@/components/Botao";
import CampoPesquisa from "@/components/CampoPesquisa";
import ListaCards from "@/components/depesaFertilizante/ListaCards";
import Titulo from "@/components/Titulo";
import { despesasFertilizantesCollection } from "@/db";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NovaDespesaFertilizante() {

    const [nomeUnidade, setNomeUnidade] = useState<string | null>('');
    const [filtroPesquisa, setFiltroPesquisa] = useState('');
    const [filtroOrdenacao, setFiltroOrdenacao] = useState('');

    const filtrosOrdenacao = [
        { nome: "Data", valor: "data" },
        { nome: "Fertilizante", valor: "fertilizante_id" },
        { nome: "Valor", valor: "valor_total" },
        { nome: "Medida", valor: "medida" },
        { nome: "Nota Fiscal", valor: "nota_fiscal_id" },

    ]

    useEffect(() => {
        const buscarhNomeUnidade = async () => {
            try {
                const unidadeNome = await AsyncStorage.getItem("unidadeNome");
                setNomeUnidade(unidadeNome);
            } catch (error) {
                console.error("Erro ao buscar o nome da unidade:", error);
            }
        };
        buscarhNomeUnidade();
    }, []);

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
        <SafeAreaView style={{ flex: 1, paddingTop: -23 }}>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <AntDesign name="arrowleft" size={24} color="black" onPress={() => router.replace('/restricted')} />
                    ),
                    title: `\t\t\t\t ${nomeUnidade}` || "",
                }}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} >
                <Titulo titulo="Despesas com Fertilizantes e Defensivos" />
                <CampoPesquisa setFiltro={setFiltroPesquisa} />
                <Botao nome="Adicionar" rota="/restricted/despesaFertilizante/criar" disabled={false} />
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
                <ListaCards filtroPesquisa={filtroPesquisa} filtroOrdenacao={filtroOrdenacao} />
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