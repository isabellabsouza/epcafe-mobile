import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {Link} from 'expo-router';
interface CardProps {
    rota: string;
    titulo: string;
}
const Card: React.FC<CardProps> = ({rota, titulo}) => {
    return (
        <Link href={rota} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text>{titulo}</Text>
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

export default Card;