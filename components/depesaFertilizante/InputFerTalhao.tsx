import database, { despesasFerTalhoesCollection, despesasFertilizantesCollection } from "@/db";
import DespesaFertilizante from "@/db/model/DespesaFertilizante";
import Talhao from "@/db/model/Talhao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface InputProps {
    label: string,
    placeholder: string,
    onPress?: () => void;
    keyboard?: KeyboardTypeOptions,
    showKeyboard?: boolean,
    precoCompra: Float,
    despesaFertilizanteId: string,
    talhao: Talhao,
    salvar: boolean,
    setSalvar: (salvar: boolean) => void;
}
export default function InputFerTalhao({
    label,
    placeholder,
    onPress,
    keyboard = 'default',
    showKeyboard = true,
    precoCompra,
    despesaFertilizanteId,
    talhao,
    salvar,
    setSalvar,
}: InputProps) {
    const [valorFinal, setValorFinal] = useState(0);
    const [quantidade, setQuantidade] = useState('');
    const [despesaFertilizante, setDespesaFertilizante] = useState<DespesaFertilizante>();
    const [tenant, setTenant] = useState('');
    const [unidade, setUnidade] = useState('');

    useEffect(() => {
        if (despesaFertilizanteId) {
            despesasFertilizantesCollection.find(despesaFertilizanteId).then((despesaFertilizante) => {
                setDespesaFertilizante(despesaFertilizante);
            })
        }
        setTenantUnidade();

        async function setTenantUnidade() {
            setTenant(await AsyncStorage.getItem('tenant') || '');
            setUnidade(await AsyncStorage.getItem('unidade') || '');
        }
    }, [])

    useEffect(() => {

        setValorFinal(precoCompra * parseFloat(quantidade) || 0);
        console.log("Preco Compra: ", precoCompra);
        console.log("Valor: ", quantidade);
        console.log("Despesa Fertilizante ID: ", despesaFertilizanteId);
        console.log("Talhao: ", talhao);

    }, [quantidade])

    useEffect(() => {
        const salvarDespesaFerTalhao = async () => {

            await database.write(async (writer) => {
                await despesasFerTalhoesCollection
                    .create((despesaFerTalhao) => {
                        despesaFerTalhao.quantidade = parseFloat(quantidade);
                        despesaFerTalhao.valor = valorFinal;
                        //@ts-ignore
                        despesaFerTalhao.talhao.id = talhao.id;
                        //@ts-ignore
                        despesaFerTalhao.despesaFertilizante.id = despesaFertilizanteId;
                        //@ts-ignore
                        despesaFerTalhao.tenant.id = tenant.id;
                        //@ts-ignore
                        despesaFerTalhao.unidade.id = unidade.id;


                    })
                let valorAtualizado = despesaFertilizante!.valorTotal + valorFinal;
                await writer.callWriter(async () =>
                    await despesaFertilizante?.update((despesaFertilizante) => {
                        despesaFertilizante.valorTotal = valorAtualizado;
                    })
                )
            })
        }

        if (salvar) {
            salvarDespesaFerTalhao()
            setSalvar(false);
        }
    }, [salvar])

    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>

                <TextInput
                    placeholder={placeholder}
                    value={quantidade}
                    onChangeText={setQuantidade}
                    onPress={onPress}
                    style={styles.campoInput}
                    keyboardType={keyboard}
                    showSoftInputOnFocus={showKeyboard}
                    autoComplete="off"
                />
                <Text style={styles.valor}>{'RS ' + valorFinal}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        marginTop: 15
    },
    container: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        padding: 25,
        marginTop: 6,
        marginBottom: 15,
        fontSize: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    campoInput: {
        flex: 1,
        fontSize: 18,
    },
    valor: {
        fontWeight: 'bold',
        marginStart: 20,
        fontSize: 18,
    }
})