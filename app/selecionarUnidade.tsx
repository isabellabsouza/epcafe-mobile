import Subtitulo from "@/components/Subtitulo";
import Titulo from "@/components/Titulo";
import { Link } from "expo-router";
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function SelecionarUnidade() {
    const unidades = [
        {
            nome: 'Fazenda São José'
        },
        {
            nome: 'Fazenda São Pedro'
        },
        {
            nome: 'Fazenda São João'
        },
        {
            nome: 'Fazenda São Paulo'
        }

    ]
    return (
        <View> 
            <Titulo titulo="Olá Usuário!" />
            <Subtitulo subtitulo="Em qual propriedade você pretende trabalhar hoje?" />

            <View style={styles.unidadesContainer}>
                <FlatList 
                    data={unidades}
                    renderItem={({item}) => (
                            <TouchableOpacity >
                        <Link href="/restricted" style={styles.unidadeCard}>
                                <Text style={styles.unidadeCardText}>{item.nome}</Text>
                        </Link>
                            </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.nome}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    unidadesContainer:{
        backgroundColor: "#D9D9D9",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        paddingVertical: 43,
        paddingHorizontal: 17,
        
    },
    unidadeCard: {
        backgroundColor: "#adabab",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 75,
        marginTop: 10
    },
    unidadeCardText: {
        fontSize: 20
    }
})