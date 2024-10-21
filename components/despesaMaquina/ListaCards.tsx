import { despesasMaquinasCollection } from "@/db";
import DespesaMaquina from "@/db/model/DespesaMaquina";
import { withObservables } from '@nozbe/watermelondb/react';
import { StyleSheet, View } from "react-native";
import Card from "./Card";

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

const enhance = withObservables([], () => ({
    despesasMaquinas: despesasMaquinasCollection.query(),
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