import { StyleSheet, View, Text } from 'react-native';
import Card from '@/components/CardPadrao';
import Subtitulo from '@/components/Subtitulo';
import Titulo from '@/components/Titulo';
import SyncButton from '@/components/navigation/SyncButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { unidadesCollection, usuariosCollection } from '@/db';

const cards = [
    {
        titulo: 'Máquinas e Implementos',
        rota: 'restricted/maquinas'
    },
    {
        titulo: 'Fertilizantes e Defensivos',
        rota: 'restricted/fertilizantes'
    },
    {
        titulo: "Despesas com Máquinas e Implementos",
        rota: 'restricted/despesaMaquina'
    },
    {
        titulo: "Despesas com Fertilizantes e Defensivos",
        rota: 'restricted/despesaFertilizante'
    }
]

export default function HomeScreen() {
    const [usuario, setUsuario] = useState<any>();
    const [nomeUnidade, setNomeUnidade] = useState<string>();

    useEffect(() => {
        const buscarInfoUsuario = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                const usuario = await usuariosCollection.find(userId || "");
                const unidadeId = await AsyncStorage.getItem("unidadeId");
                const unidade = await unidadesCollection.find(unidadeId || "");
                setUsuario(usuario);
                setNomeUnidade(unidade.nome);
            } catch (error) {
                console.error("Erro ao buscar informações do usuário: ", error);
            }
        }
        buscarInfoUsuario();
    }, [])

    return (
        <SafeAreaView style={styles.appContainer}>
            {usuario ? (
                <>
                    <View style={styles.syncButton}>
                        <Text style={styles.unidade}>{nomeUnidade}</Text>
                        <SyncButton />
                    </View>
                    <Titulo titulo={`Bem-vindo ${usuario.nome}!`} />
                    <Subtitulo subtitulo="Gerenciar propriedade" />
                    <View style={styles.cardsContainer}>
                        {
                            cards.map((card, index) => (
                                <Card
                                    key={index}
                                    titulo={card.titulo}
                                    rota={card.rota}
                                />
                            ))
                        }
                    </View>
                </>
            ) : (
                <Titulo titulo="Carregando..." />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        padding: 17,
    },
    syncButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10
    },
    unidade: {
        fontSize: 20,
    },
    cardsContainer: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
})