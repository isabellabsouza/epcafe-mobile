import { Text, StyleSheet } from 'react-native';

interface TituloProps {
    titulo: string;
}

export default function Titulo({ titulo }: TituloProps) {
    return (
        <Text style={styles.titulo}>{titulo}</Text>
    )
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 15
    }
})