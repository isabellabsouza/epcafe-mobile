import { useState } from "react";
import { TextInput, View, StyleSheet, Button } from "react-native"
import { Ionicons } from '@expo/vector-icons';


export default function CampoPesquisa() {
     const [pesquisa, setPesquisa] = useState('');
    

    const pesquisar = () => {
        console.warn("Pesquisando por: " + pesquisa);

        setPesquisa('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.barraPesquisa}>
                <Ionicons name="search-sharp" size={24} color="black" />
                <TextInput
                    value={pesquisa}
                    onChangeText={setPesquisa}
                    placeholder="Pesquisar"
                    style={styles.input} />

            </View>
            {/* {pesquisa && <Button title="Pesquisar" onPress={pesquisar} /> } */}
        </View>
    );
    
}

const styles = StyleSheet.create({
    barraPesquisa: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        borderRadius: 30,
        paddingLeft: 12,
        marginBottom: 15,
        marginTop: 15
    },
    input: {
        fontSize: 15,
        padding: 10,
        flex: 1,
    },
    container: {
        gap: 10
    }
})