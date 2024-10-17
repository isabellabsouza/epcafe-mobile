import Botao from "@/components/Botao";
import CampoPesquisa from "@/components/CampoPesquisa";
import CardLista from "@/components/CardLista";
import ListaCards from "@/components/despesaMaquina/ListaCards";
import Titulo from "@/components/Titulo";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";



export default function NovaDespesaMaquina() {
    

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
                <Titulo titulo="Despesas com Máquinas e Implementos" />
                <CampoPesquisa />
                <Botao nome="Adicionar" rota="/restricted/despesaMaquina/criar" disabled={false}/>
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
                {/* <ListaCards /> */}
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