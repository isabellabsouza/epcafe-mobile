import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {Link} from 'expo-router';
interface CardProps {
    route: string;
    title: string;
}
const Card: React.FC<CardProps> = ({route, title}) => {
    return (
        <Link href={route} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Text>{title}</Text>
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