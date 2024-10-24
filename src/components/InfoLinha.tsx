import { StyleSheet, Text, View } from "react-native";

interface InfoLinhaProps {
    label: string,
    valor: any
}
export default function InfoLinha({ label, valor }: InfoLinhaProps) {

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
        alignItems: 'center', 
        marginBottom: 15,
        marginTop: 15,
    },
    label: {
        fontSize: 18,
        flex: 1,  
    },
    valor: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,  
        textAlign: 'right',
    },
    toggleButton: {
        marginLeft: 10, 
    },
    expandedView: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    valorExpanded: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
})