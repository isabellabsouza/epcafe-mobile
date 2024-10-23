import { despesasMaquinasCollection } from "@/db";
import DespesaMaquina from "@/db/model/DespesaMaquina";
import { withObservables } from '@nozbe/watermelondb/react';
import { StyleSheet, View, Text } from "react-native";
import Card from "./Card";
import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ListaCards({ despesasMaquinas }: { despesasMaquinas: DespesaMaquina[] }) {
    return (

        <View style={styles.cardsContainer}>
            {
                despesasMaquinas?.map((item) => 
                    <Card 
                        key={item.id.toString()} 
                        despesaMaquina={item} 
                        rota="/restricted/despesaMaquina/detalhar" 
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
        ({filtroPesquisa, filtroOrdenacao}: ListaCardsProps) => ({
            despesasMaquinas: despesasMaquinasCollection.query(
                Q.where('unidade_id', unidadeId),
                ...(filtroPesquisa
                    ? [Q.on(
                        'maquina', 
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