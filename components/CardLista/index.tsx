import { FlatList, StyleSheet, View, Text, SectionList } from "react-native";
import CardMaquina from "../CardMaquina";
import { useEffect, useState } from "react";
import Maquina from "@/db/model/Maquina";
import { maquinasCollection } from "@/db";

import { withObservables } from '@nozbe/watermelondb/react';

function CardLista({ maquinas }: { maquinas: Maquina[] }) {

    // const [maquinas, setMaquinas] = useState<Maquina[]>([]);

    // useEffect(() => {
    //     const buscarMaquinas = async () => {
    //         const maquinas = await maquinasCollection.query().fetch();
    //         setMaquinas(maquinas);
    //     };
    //     buscarMaquinas();
    // }, []);

    return (

        <View style={styles.cardsContainer}>
            {
                maquinas.map((item) => <CardMaquina key={item.id.toString()} maquina={item} rota="/restricted/maquinas/detalhar" />)
            }
        </View>

        // <FlatList
        //     style={styles.listaContainer}
        //     contentContainerStyle={{ gap: 5 }}
        //     data={maquinas}
        //     numColumns={2}
        //     renderItem={({ item }) => <CardMaquina maquina={item} rota="/restricted/maquinas/detalhar" />}
        //     keyExtractor={(item) => item.id.toString()}
        //     ListEmptyComponent={<EmptyListMessage />}
        // />

        // <SectionList 
        //     sections={[{ title: 'Maquinas', data: maquinas }]}
        //     keyExtractor={(item) => item.id.toString()}
        //     renderItem={
        //         ({ item }) => 
        //             <CardMaquina 
        //                 maquina={item} 
        //                 rota="/restricted/maquinas/detalhar"
        //             />
        //     }

        // />
    );


}

function EmptyListMessage() {
    return <View style={styles.emptyMessage}><Text>Nenhuma máquina encontrada</Text></View>;
}

const enhance = withObservables([], () => ({
    maquinas: maquinasCollection.query(),
}));

export default enhance(CardLista);

const styles = StyleSheet.create({
    listaContainer: {
        // marginTop: 20,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between'

    },
    emptyMessage: {
        marginTop: 20,
        alignItems: 'center',
    },
    cardsContainer: {
        //flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
})