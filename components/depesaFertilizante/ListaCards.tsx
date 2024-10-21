import { despesasFertilizantesCollection } from "@/db";
import DespesaMaquina from "@/db/model/DespesaMaquina";
import { withObservables } from '@nozbe/watermelondb/react';
import { StyleSheet, View } from "react-native";
import Card from "./Card";
import DespesaFertilizante from "@/db/model/DespesaFertilizante";

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

const enhance = withObservables([], () => ({
    despesasFertilizantes: despesasFertilizantesCollection.query(),
}));

export default enhance(ListaCards);

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