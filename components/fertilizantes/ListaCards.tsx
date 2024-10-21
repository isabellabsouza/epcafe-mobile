import CardFertilizante from "@/components/fertilizantes/CardFertilizante";
import { fertilizantesCollection } from "@/db";
import Fertilizante from "@/db/model/Fertilizante";
import { StyleSheet, Text, View } from "react-native";

import { withObservables } from '@nozbe/watermelondb/react';

function CardLista({ fertilizantes }: { fertilizantes: Fertilizante[] }) {

    return (

        <View style={styles.cardsContainer}>
            {
                fertilizantes.map((item) => 
                    <CardFertilizante 
                        key={item.id.toString()} 
                        fertilizante={item} 
                        rota="/restricted/fertilizantes/detalhar" 
                    />
                )
            }
        </View>

    );


}

function EmptyListMessage() {
    return <View style={styles.emptyMessage}><Text>Nenhum fertilizante encontrado</Text></View>;
}

const enhance = withObservables([], () => ({
    fertilizantes: fertilizantesCollection.query(),
}));

export default enhance(CardLista);

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