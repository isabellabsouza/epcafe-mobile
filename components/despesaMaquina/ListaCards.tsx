import { despesasMaquinasCollection, fertilizantesCollection } from "@/db";
import { StyleSheet, Text, View } from "react-native";
import DespesaMaquina from "@/db/model/DespesaMaquina";
import { withObservables } from '@nozbe/watermelondb/react';
import Card from "./Card";

function CardLista({ despesaMaquina }: { despesaMaquina: DespesaMaquina[] }) {

    return (

        <View style={styles.cardsContainer}>
            {
                despesaMaquina.map((item) => 
                    <Card 
                        key={item.id.toString()} 
                        fertilizante={item} 
                        rota="/restricted/despesaMaquina/detalhar" 
                    />
                )
            }
        </View>

    );


}

const enhance = withObservables([], () => ({
    despesasMaquinas: despesasMaquinasCollection.query(),
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