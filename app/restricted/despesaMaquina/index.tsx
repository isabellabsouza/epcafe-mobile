import FormFactory from "@/components/FormFactory/FormFactory";
import MontaObject from "@/components/FormFactory/MontaObject";
import Subtitulo from "@/components/Subtitulo";
import Titulo from "@/components/Titulo";
import database, { despesasFertilizantesCollection, despesasMaquinasCollection } from "@/db";
import { View, ScrollView, Button, StyleSheet } from "react-native";



export default function NovaDespesaMaquina() {
    const montaObject = new MontaObject();

    const test2 = () => {

        let values = montaObject;
        console.log(montaObject.getTupla());


        // database.write(async () => {
        //     await despesasMaquinasCollection.create(despesa => {
        //         despesa.data = values.getValue('data')
        //         despesa.distanciaTrabalhada = values.getValue('distanciaTrabalhada');
        //         despesa.fatorPotencia = values.getValue('fatorPotencia');
        //         despesa.litrosConsumidos = values.getValue('litrosConsumidos');
        //         despesa.minutosTrabalhados = values.getValue('minutosTrabalhados');
        //         despesa.precoUnitarioCombustivel = values.getValue('precoUnitarioCombustivel');
        //         despesa.valorTotal = values.getValue('valorTotal');
        //         despesa.unidadeHoras = values.getValue('unidadeHoras');
        //         despesa.tempoTrabalho = values.getValue('tempoTrabalho');
        //         despesa.maquina = values.getValue('maquina');
        //         despesa.tenant = values.getValue('tenant');
        //         despesa.unidade = values.getValue('unidade');
        //     })
        // }).then(() => {
        //     console.log('Despesa de máquina salva com sucesso')
        // })
        //     .catch((error) => {
        //         console.error('Erro ao salvar despesa de máquina:', error)
        //     })

        // console.log(
        //     montaObject.getTupla()
        // )
    }
    [{nome_coluna: 'label'}]

    return (
        <View style={styles.appContainer}>
            <Titulo titulo={"Despesas com Máquinas"} />
            <Subtitulo subtitulo="Insira os dados da despesa" />
            <ScrollView style={{ width: '100%', paddingHorizontal: 25, paddingBottom: 15 }}>
                {
                    FormFactory.createForm(despesasMaquinasCollection, montaObject)
                }
                <Button title="Salvar" onPress={test2} />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})