import Maquina from "@/db/model/Maquina";
import { withObservables } from '@nozbe/watermelondb/react';
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CardMaquinaProps = {
    maquina: Maquina;
    rota: string;
}
function CardMaquina({maquina, rota}: CardMaquinaProps) {
    return (
        <Link href={{ pathname: rota as any, params: {id: maquina.id}}} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.titulo}>{maquina.nome}</Text>
                <Text style={styles.info}>{maquina.tipoCombustivel}</Text>
                <Text style={styles.info}>{maquina.vidaUtil} anos</Text>
            </TouchableOpacity>
        </Link>
    );
}

const enhance = withObservables(
    ['maquina'],
    ({ maquina }: CardMaquinaProps) => ({
      maquina,
    })
);
  
export default enhance(CardMaquina);

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
        fontWeight: 'bold'
    },
    info: {
        fontSize: 15
    }
})