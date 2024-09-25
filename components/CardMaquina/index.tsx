import Maquina from "@/db/model/Maquina";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type CardMaquinaProps = {
    maquina: Maquina;
    rota: string;
}
export default function CardMaquina({maquina, rota}: CardMaquinaProps) {
    return (
        <Link href={{ pathname: rota, params: {id: maquina.id}}} asChild>
        <TouchableOpacity style={styles.cardContainer}>
            <Text>{maquina.nome}</Text>
            <Text>{maquina.vida_util}</Text>
        </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'gray',
        padding: 10,
        
    }
})