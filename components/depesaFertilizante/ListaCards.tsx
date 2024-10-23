import { despesasFertilizantesCollection } from "@/db";
import { withObservables } from '@nozbe/watermelondb/react';
import { StyleSheet, View, Text } from "react-native";
import Card from "./Card";
import DespesaFertilizante from "@/db/model/DespesaFertilizante";
import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ListaCards({ despesasFertilizantes }: { despesasFertilizantes: DespesaFertilizante[] }) {


    return (

        <View style={styles.cardsContainer}>
            {
                despesasFertilizantes?.map((item) =>
                    <Card
                        key={item.id.toString()}
                        despesaFertilizante={item}
                        rota="/restricted/despesaFertilizante/detalhar"
                    />
                )
            }
        </View>

    );


}

interface ListaCardsProps {
    filtroPesquisa: string;
    filtroOrdenacao: string;
}
function ListaCardsEnhanced({ filtroPesquisa, filtroOrdenacao }: ListaCardsProps) {
    const [unidadeId, setUnidadeId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUnidadeId() {
            const storedUnidadeId = await AsyncStorage.getItem('unidadeId');
            setUnidadeId(storedUnidadeId);
        }
        fetchUnidadeId();
    }, []);

    if (!unidadeId) {
        return <Text>Carregando dados...</Text>;
    }

    const EnhancedListaCards = withObservables(
        ['filtroPesquisa', 'filtroOrdenacao'],
        ({ filtroPesquisa, filtroOrdenacao }: ListaCardsProps) => ({
            despesasFertilizantes: despesasFertilizantesCollection.query(
                Q.where('unidade_id', unidadeId),
                ...(filtroPesquisa
                    ? [Q.on(
                        'fertilizante',
                        Q.where('nome', Q.like(`%${filtroPesquisa}%`))
                    )]
                    : []),
                Q.sortBy(filtroOrdenacao || 'data', 'asc')
            ),
        })
    )(ListaCards);

    return <EnhancedListaCards filtroPesquisa={filtroPesquisa} filtroOrdenacao={filtroOrdenacao} />;

}

export default ListaCardsEnhanced;

const styles = StyleSheet.create({
    emptyMessage: {
        marginTop: 20,
        alignItems: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
})