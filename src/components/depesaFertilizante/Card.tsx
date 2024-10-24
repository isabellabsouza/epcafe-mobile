import DespesaFertilizante from "@/src/db/model/DespesaFertilizante";
import Fertilizante from "@/src/db/model/Fertilizante";
import withObservables from "@nozbe/watermelondb/react/withObservables";
import { Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CardProps {
    despesaFertilizante: DespesaFertilizante;
    rota: string;
    fertilizante: Fertilizante;
}
function Card({ despesaFertilizante, rota, fertilizante }: CardProps) {
    return (
        <Link href={{ pathname: rota as any, params: { id: despesaFertilizante.id } }} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.titulo}>{fertilizante.nome}</Text>
                <Text style={styles.info}>{despesaFertilizante.data.toLocaleDateString()}</Text>
                <Text style={styles.info}>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                        .format(despesaFertilizante.valorTotal)
                        .replace('R$', 'R$ ')
                    }
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

const enhance = withObservables(
    ['despesaFertilizante'],
    ({ despesaFertilizante }: CardProps) => ({
        despesaFertilizante,
        fertilizante: despesaFertilizante.fertilizante.observe()
    })
);

export default enhance(Card);


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#D9D9D9',
        paddingVertical: 15,
        paddingHorizontal: 12,
        marginVertical: 10,
        width: '48%',
        borderRadius: 20,
    },
    titulo: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10
    },
    info: {
        fontSize: 15,
        marginBottom: 5
    }
})