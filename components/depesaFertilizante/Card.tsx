import DespesaFertilizante from "@/db/model/DespesaFertilizante";
import withObservables from "@nozbe/watermelondb/react/withObservables";
import { Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CardProps {
    despesaFertilizante: DespesaFertilizante;
    rota: string;
}
function Card({ despesaFertilizante, rota }: CardProps) {
    return (
        <Link href={{ pathname: rota as any, params: { id: despesaFertilizante.id } }} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.titulo}>{despesaFertilizante.data.toLocaleDateString()}</Text>
                <Text style={styles.info}>{despesaFertilizante.fertilizante.nome}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const enhance = withObservables(
    ['despesaFertilizante'],
    ({ despesaFertilizante }: CardProps) => ({
        despesaFertilizante,
    })
);

export default enhance(Card);


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