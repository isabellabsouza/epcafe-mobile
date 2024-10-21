import { StyleSheet, View } from 'react-native';
import Card from '@/components/Card';
import Subtitulo from '@/components/Subtitulo';
import Titulo from '@/components/Titulo';
import SyncButton from '@/components/navigation/SyncButton';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        titulo: "Despesas com Máquinas",
        rota: 'restricted/despesaMaquina'
    },
    {
        titulo: "Despesas com Fertilizantes e Defensivos",
        rota: 'restricted/despesaFertilizante'
    }
]

export default function HomeScreen() {

    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.syncButton}>
                <SyncButton />
            </View>
            <Titulo titulo="Bem vindo usuário!"></Titulo>
            <Subtitulo subtitulo="Gerenciar propriedade"></Subtitulo>
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
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    cardsContainer: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
})