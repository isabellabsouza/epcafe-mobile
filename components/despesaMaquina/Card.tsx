import DespesaMaquina from "@/db/model/DespesaMaquina";
import Maquina from "@/db/model/Maquina";
import withObservables from "@nozbe/watermelondb/react/withObservables";
import { Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CardProps {
    despesaMaquina: DespesaMaquina;
    rota: string;
    maquina?: Maquina;
}
function Card({ despesaMaquina, maquina, rota }: CardProps) {
    return (
        <Link href={{ pathname: rota as any, params: { id: despesaMaquina.id } }} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.titulo}>{maquina ? maquina.nome : "Carregando máquina..."}</Text>
                <Text style={styles.info}>{despesaMaquina.data.toLocaleDateString()}</Text>
                <Text style={styles.info}>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                        .format(despesaMaquina.valorTotal)
                        .replace('R$', 'R$ ')
                    }
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

const enhance = withObservables(
    ['despesaMaquina'],
    ({ despesaMaquina }: CardProps) => ({
        despesaMaquina,
        maquina: despesaMaquina.maquina.observe()
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
        fontSize: 16,
        marginBottom: 5
    }
})