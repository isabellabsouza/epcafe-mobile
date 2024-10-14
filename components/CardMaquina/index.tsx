import Maquina from "@/db/model/Maquina";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { withObservables } from '@nozbe/watermelondb/react';


type CardMaquinaProps = {
    maquina: Maquina;
    rota: string;
}
function CardMaquina({maquina, rota}: CardMaquinaProps) {
    return (
        <Link href={{ pathname: rota, params: {id: maquina.id}}} asChild>
        <TouchableOpacity style={styles.cardContainer}>
            <Text>{maquina.nome}</Text>
            <Text>{maquina.vida_util}</Text>
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
        backgroundColor: 'gray',
        padding: 10,
        flex: 1,
        margin: 5,
        borderRadius: 10
        
    }
})