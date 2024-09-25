import { FlatList, StyleSheet } from "react-native";
import CardMaquina from "../CardMaquina";
import { useEffect, useState } from "react";
import Maquina from "@/db/model/Maquina";
import { maquinasCollection } from "@/db";

import { withObservables } from '@nozbe/watermelondb/react';


function CardLista({maquinas}: {maquinas: Maquina[]}) {

    // const [maquinas, setMaquinas] = useState<Maquina[]>([]);

    // useEffect(() => {
    //     const buscarMaquinas = async () => {
    //         const maquinas = await maquinasCollection.query().fetch();
    //         setMaquinas(maquinas);
    //     };
    //     buscarMaquinas();
    // }, []);

    return (

        <FlatList
            contentContainerStyle={{ gap: 5 }}
            data={maquinas}
            renderItem={({ item }) => <CardMaquina maquina={item} rota="/restricted/maquinas/detalhar" />}
        />
    );

   
}

const enhance = withObservables([], () => ({
    maquinas: maquinasCollection.query(),
}));

export default enhance(CardLista);

const styles = StyleSheet.create({
    listaContainer: {
        
    }
})