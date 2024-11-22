import Fertilizante from "@/src/db/model/Fertilizante";
import { withObservables } from '@nozbe/watermelondb/react';
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


type CardFertilizanteProps = {
    fertilizante: Fertilizante;
    rota: string;
}
function CardFertilizante({ fertilizante, rota }: CardFertilizanteProps) {
    return (
        <Link href={{ pathname: rota as any, params: { id: fertilizante.id } }} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.titulo}>{fertilizante.nome}</Text>
                <Text style={styles.info}>{fertilizante.tipo}</Text>
            </TouchableOpacity>
        </Link>
    );
}

const enhance = withObservables(
    ['fertilizante'],
    ({ fertilizante }: CardFertilizanteProps) => ({
        fertilizante,
    })
);

export default enhance(CardFertilizante);

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        paddingLeft: 15,
        marginVertical: 10,
        width: '48%',
        borderRadius: 20,
        gap: 5
    },
    titulo: {
        fontSize: 19,

    },
    info: {
        fontSize: 15
    }
})