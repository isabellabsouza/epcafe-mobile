import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Card from '@/src/components/CardPadrao';
import Subtitulo from '@/src/components/Subtitulo';
import Titulo from '@/src/components/Titulo';
import SyncButton from '@/src/components/navigation/SyncButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { unidadesCollection, usuariosCollection } from '@/src/db';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import BotaoMenu from '@/src/components/navigation/BotaoMenu';

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
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                            <SyncButton />
                            <BotaoMenu />
                        </View>
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
        flex: 1,
        marginBottom: 0,
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
    botoesContainer: {
        
        gap: 15
    },
    botoesAcoes: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        gap: 10, 
        alignItems: 'center', 
        backgroundColor: '#D9d9d9',
        padding: 10,
        borderRadius: 10
    }
})