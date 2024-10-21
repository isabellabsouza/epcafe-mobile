import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {Href, Link} from 'expo-router';
interface CardProps {
    rota: string;
    titulo: string;
}
const Card: React.FC<CardProps> = ({rota, titulo}) => {
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

export default Card;