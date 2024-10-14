import { Href, Link } from "expo-router";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface BotaoProps {
    nome: string,
    rota: string
}
export default function Botao({nome, rota} : BotaoProps) {
    return (
        <Link href={rota as unknown as Href<string | object>} asChild>
            <TouchableOpacity style={styles.botao} >
                <Text style={styles.textoBotao}>{nome}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        width: 120,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        marginBottom: 15,
        marginTop: 15,
    },
    textoBotao: {
        fontSize: 18,
    }
})