import CardFertilizante from "@/src/components/fertilizantes/CardFertilizante";
import { fertilizantesCollection } from "@/src/db";
import Fertilizante from "@/src/db/model/Fertilizante";
import { StyleSheet, Text, View } from "react-native";
import { withObservables } from '@nozbe/watermelondb/react';
import { Q } from "@nozbe/watermelondb";

function CardLista({ fertilizantes }: { fertilizantes: Fertilizante[] }) {

    return (

        <View style={styles.cardsContainer}>
            {fertilizantes.length === 0 ? <EmptyListMessage /> :
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

const enhance = withObservables(
    ['filtroPesquisa'], 
    ({ filtroPesquisa }: {filtroPesquisa: string}) => ({
        fertilizantes: filtroPesquisa
            ? fertilizantesCollection.query(Q.where('nome', Q.like(`%${filtroPesquisa}%`)))
            : fertilizantesCollection.query(),
    })
);

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