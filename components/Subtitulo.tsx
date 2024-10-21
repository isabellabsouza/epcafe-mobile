import { StyleSheet, Text } from "react-native";

interface SubtituloProps {
    subtitulo: string;
}
export default function Subtitulo({subtitulo}: SubtituloProps) {
    return (
        <Text style={styles.subtitulo}>{subtitulo}</Text>
    )
}

const styles = StyleSheet.create({
    subtitulo: {
        fontSize: 20,
        textAlign: 'center',
    }
})