import { StyleSheet, View, Text } from "react-native";

interface InfoLinhaProps {
    label: string,
    valor: any
}
export default function InfoLinha({label, valor}: InfoLinhaProps) {
    return (
        <View style={styles.infoCard}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.valor}>{valor}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    infoCard: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 15,
    },
    label: {
        fontSize: 18,
    },
    valor: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})