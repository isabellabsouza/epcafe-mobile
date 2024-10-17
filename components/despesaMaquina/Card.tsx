import DespesaMaquina from "@/db/model/DespesaMaquina";
import withObservables from "@nozbe/watermelondb/react/withObservables";
import { Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CardProps {
    despesaMaquina: DespesaMaquina;
    rota: string;
}
function Card({ despesaMaquina, rota }: CardProps) {
    return (
        <Link href={{ pathname: rota as any, params: { id: despesaMaquina.id } }} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.titulo}>{despesaMaquina.valorTotal}</Text>
                <Text style={styles.info}>{despesaMaquina.data.toDateString()}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const enhance = withObservables(
    ['despesaMaquina'],
    ({ despesaMaquina }: CardProps) => ({
        despesaMaquina,
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