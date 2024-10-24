import { talhoesCollection } from "@/src/db";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface InfoFerTalhaoProps {
    talhaoId: string,
    medida: string,
    quantidade: number,
    valor: number
}
export default function InfoFerTalhao({ talhaoId, medida, quantidade, valor }: InfoFerTalhaoProps) {

    const [nomeTalhao, setNomeTalhao] = useState('');
    
    useEffect(() => {
        const buscarDespesaFerTalhao = async () => {
            try {
                const talhao = await talhoesCollection.find(talhaoId);
                setNomeTalhao(talhao.nome);
            } catch (error) {
                console.log("Não foi possível buscar a despesa do talhão: ", error);
            }
        }
        buscarDespesaFerTalhao();
    }, [])
    return (
        <>
            <Text style={styles.label}>{nomeTalhao}</Text>
            <View style={styles.infoCard}>
                <Text style={styles.quantidade}>{quantidade}</Text>
                <Text style={styles.quantidade}>{medida}</Text>
                <Text style={styles.valor}>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL'
                    }).format(valor)
                    .replace('R$', 'R$ ')
                    }
                </Text>
            </View>
        </>
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
    },
    label: {
        fontSize: 18,
        flex: 1,
        marginTop: 15,
    },
    quantidade: {
        fontSize: 18,
        flex: 1,
    },
    valor: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right',
    }
})