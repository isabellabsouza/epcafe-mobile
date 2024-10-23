import React, { useState, useEffect } from 'react';
import { maquinasCollection } from "@/db";
import Maquina from "@/db/model/Maquina";
import { StyleSheet, Text, View } from "react-native";
import CardMaquina from "./Card";
import { withObservables } from '@nozbe/watermelondb/react';
import { Q } from '@nozbe/watermelondb';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CardLista({ maquinas }: { maquinas: Maquina[] }) {

    return (
        <View style={styles.cardsContainer}>
            {maquinas.length === 0 ? <EmptyListMessage /> :
                maquinas.map((item) =>
                    <CardMaquina
                        key={item.id.toString()}
                        maquina={item}
                        rota="/restricted/maquinas/detalhar"
                    />
                )
            }
        </View>
    );
}

function EmptyListMessage() {
    return <View style={styles.emptyMessage}><Text>Nenhuma máquina encontrada</Text></View>;
}

interface CardListaProps {
    filtroPesquisa: string;
    filtroOrdenacao: string;
}

function CardListaEnhanced({ filtroPesquisa, filtroOrdenacao }: CardListaProps) {
    const [tenantId, setTenantId] = useState<string | null>(null);

    // Use o useEffect para carregar o tenantId do AsyncStorage
    useEffect(() => {
        async function fetchTenantId() {
            const storedTenantId = await AsyncStorage.getItem('tenantId');
            setTenantId(storedTenantId);
        }
        fetchTenantId();
    }, []);

    if (!tenantId) {
        // Enquanto o tenantId ainda não foi carregado, você pode mostrar um loading ou uma mensagem
        return <Text>Carregando dados...</Text>;
    }

    const EnhancedCardLista = withObservables(
        ['filtroPesquisa', 'filtroOrdenacao'],
        ({ filtroPesquisa, filtroOrdenacao }: CardListaProps) => ({
            maquinas: maquinasCollection.query(
                Q.where('tenant_id', tenantId), // Filtrar pelo tenant_id
                ...(filtroPesquisa
                    ? [Q.where('nome', Q.like(`%${filtroPesquisa}%`))]
                    : []), // Evitar WHERE vazio
                Q.sortBy(filtroOrdenacao || 'nome', 'asc')
            ),
        })
    )(CardLista);

    return <EnhancedCardLista filtroPesquisa={filtroPesquisa} filtroOrdenacao={filtroOrdenacao} />;
}

export default CardListaEnhanced;

const styles = StyleSheet.create({
    listaContainer: {
    },
    emptyMessage: {
        marginTop: 20,
        alignItems: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});
