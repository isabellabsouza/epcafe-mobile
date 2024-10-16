import { Href, Link, router } from "expo-router";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface BotaoProps {
    nome: string,
    rota?: string;  //rota é opcional
    onPress?: () => void;
    disabled?: boolean;
}
export default function Botao({ nome, rota, onPress, disabled=false }: BotaoProps) {

    const handlePress = () => {
        if (onPress) {

            onPress();
        } else if (rota) {

            router.push(rota as unknown as Href<string | object>);
        }
    };

    return (
        // <Link href={rota as unknown as Href<string | object>} asChild>
        //     <TouchableOpacity 
        //         style={styles.botao}
        //         onPress={handlePress} 
        //     >
        //         <Text style={styles.textoBotao}>{nome}</Text>
        //     </TouchableOpacity>
        // </Link>

        <TouchableOpacity
            style={styles.botao}
            onPress={handlePress}
            disabled={disabled}
        >
            <Text style={styles.textoBotao}>{nome}</Text>
        </TouchableOpacity>
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