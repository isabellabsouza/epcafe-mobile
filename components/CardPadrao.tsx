import { Href, Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
interface CardProps {
    rota: string;
    titulo: string;
}
export default function Card ({rota, titulo}: CardProps){
    return (
        <Link href={rota as unknown as Href<string | object>} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.titulo}>{titulo}</Text>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#D9D9D9',
        padding: 15,
        paddingLeft: 15,
        marginVertical: 10,
        width: '48%', 
        borderRadius: 20,
        gap: 5
    },
    titulo: {
        fontSize: 19,
    }
})