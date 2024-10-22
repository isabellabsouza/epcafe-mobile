import Botao from "@/components/Botao";
import CampoPesquisa from "@/components/CampoPesquisa";
import ListaCards from "@/components/despesaMaquina/ListaCards";
import Titulo from "@/components/Titulo";
import { despesasMaquinasCollection } from "@/db";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NovaDespesaMaquina() {

    const [nomeUnidade, setNomeUnidade] = useState<string | null>('');
    const [filtroPesquisa, setFiltroPesquisa] = useState('');
    const [filtroOrdenacao, setFiltroOrdenacao] = useState('');

    const filtrosOrdenacao = [
        { nome: "Data", valor: "data" },
        { nome: "Máquina", valor: "maquina_id" },
        { nome: "Valor", valor: "valor_total" },
        { nome: "Preço Combustível", valor: "preco_unitario_combustivel" },
    ]

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

    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const despesas = await despesasMaquinasCollection.query().fetch();
                //console.log(despesas);
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
                <Titulo titulo="Despesas com Máquinas e Implementos" />
                <CampoPesquisa setFiltro={setFiltroPesquisa} />
                <Botao nome="Adicionar" rota="/restricted/despesaMaquina/criar" />
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