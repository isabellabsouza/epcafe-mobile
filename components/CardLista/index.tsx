import { maquinasCollection } from "@/db";
import Maquina from "@/db/model/Maquina";
import { StyleSheet, Text, View } from "react-native";
import CardMaquina from "../CardMaquina";
import { withObservables } from '@nozbe/watermelondb/react';

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

const enhance = withObservables([], () => ({
    maquinas: maquinasCollection.query(),
}));

export default enhance(CardLista);

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
})