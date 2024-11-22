import Botao from "@/src/components/Botao";
import Input from "@/src/components/Formulario/Input";
import InputData from "@/src/components/Formulario/InputData";
import Select from "@/src/components/Formulario/Select";
import Titulo from "@/src/components/Titulo";
import Toast from "@/src/components/toast/Toast";
import DespesaMaquinaController from "@/src/controller/DespesaMaquinaController";
import DespesaMaquina from "@/src/db/model/DespesaMaquina";
import FatorPotencia from "@/src/utils/enums/FatorPotencia";
import { buscarTenantId, buscarUnidadeId } from "@/src/utils/functions/Storage";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

export default function CriarDespesaMaquina() {

    const { id } = useLocalSearchParams();

    const [despesaMaquina, setDespesaMaquina] = useState<DespesaMaquina>();
    const titulo = id ? "Editar Despesa com Máquina" : "Adicionar Despesa com Máquina";
    const [selectedId, setSelectedId] = useState<string | undefined>();

    // variáveis de estado para exibir toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    // variáveis de estado para os campos do formulário
    const [data, setData] = useState('');
    const [distanciaTrabalhada, setDistanciaTrabalhada] = useState('');
    const [fatorPotencia, setFatorPotencia] = useState('');
    const [precoUnitarioCombustivel, setPrecoUnitarioCombustivel] = useState('');
    const [unidadeHoras, setUnidadeHoras] = useState<boolean>(false);
    const [tempoTrabalhado, setTempoTrabalhado] = useState('');
    const [maquina, setMaquina] = useState('');
    const [unidade, setUnidade] = useState<string | null>('');
    const [tenant, setTenant] = useState<string | null>('');

    // definição das listas de opções para os selects
    const [maquinas, setMaquinas] = useState<any[]>([]);
    const listaFatorPotencia = Array.from(Object.keys(FatorPotencia))
        .map((key) => {
            const item = FatorPotencia[key as keyof typeof FatorPotencia];
            if (typeof item === 'object' && 'description' in item) {
                return {
                    label: item.description,
                    value: key,
                    valor: item.value,
                };
            }
            return null;
        })
        .filter(item => item !== null);

    const opcaoUnidadeTempo: RadioButtonProps[] = useMemo(() => ([
        { id: '0', label: 'Horas', value: 'Horas' },
        { id: '1', label: 'Minutos', value: 'Minutos' }
    ]), []);

    useEffect(() => {
        const buscarDados = async () => {
            const tenantId = await buscarTenantId();
            setTenant(tenantId);

            const unidadeId = await buscarUnidadeId();
            setUnidade(unidadeId);

            if (id) {

                const despesaMaquinaEncontrada = await DespesaMaquinaController.buscarDespesaMaquina(String(id));

                if (despesaMaquinaEncontrada) {
                    setDespesaMaquina(despesaMaquinaEncontrada);
                    setData(despesaMaquinaEncontrada.data.toISOString());
                    setDistanciaTrabalhada(despesaMaquinaEncontrada.distanciaTrabalhada.toString());
                    setFatorPotencia(despesaMaquinaEncontrada.fatorPotencia.toString());
                    setPrecoUnitarioCombustivel(despesaMaquinaEncontrada.precoUnitarioCombustivel.toString());
                    setUnidadeHoras(despesaMaquinaEncontrada.unidadeHoras);
                    setTempoTrabalhado(despesaMaquinaEncontrada.tempoTrabalhado.toString());
                    setMaquina(despesaMaquinaEncontrada.maquina.id);
                }
            }

        };
        buscarDados();
    }, []);

    useEffect(() => {
        const buscarMaquinas = async () => {
            if (tenant && unidade) {
                const maquinasEncontradas = await DespesaMaquinaController.montarListaMaquinasPorTenant(tenant);
                setMaquinas(maquinasEncontradas);
            }
        };
        buscarMaquinas();
    }, [tenant, unidade]);

    const salvar = async () => {
        const despesaMaquinaData = {
            data: new Date(data),
            distanciaTrabalhada: parseFloat(distanciaTrabalhada),
            //@ts-ignore
            fatorPotencia: fatorPotencia.value.toString(),
            precoUnitarioCombustivel: parseFloat(precoUnitarioCombustivel),
            unidadeHoras: selectedId === '0' ? false : true,
            tempoTrabalhado: parseFloat(tempoTrabalhado),
            //@ts-ignore
            maquina: maquina.value,
            tenant,
            unidade,
        }

        //@ts-ignore
        const sucesso = await DespesaMaquinaController.salvarDespesaMaquina(despesaMaquinaData, despesaMaquina);
        if (sucesso) {

            setData('');
            setDistanciaTrabalhada('');
            setFatorPotencia('');
            setPrecoUnitarioCombustivel('');
            setUnidadeHoras(false);
            setTempoTrabalhado('');
            setMaquina('');

            setGravidade('sucesso');
            setMensagem(despesaMaquina ? 'Despesa atualizada com sucesso!' : 'Despesa criada com sucesso!');
        } else {
            setGravidade('erro');
            setMensagem(despesaMaquina ? 'Erro ao atualizar a despesa!' : 'Erro ao atualizar a despesa!');
        }
        setToast(true);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} >
            <Titulo titulo={titulo}></Titulo>

            <InputData
                label="Data"
                placeholder="Selecione a data da despesa"
                value={data}
                //@ts-ignore
                onChangeText={(text) => setData(text)}
            />

            <Select
                dados={maquinas}
                onChange={(value) => setMaquina(value)}
                value={maquina}
                placeholder="Selecione a máquina/implemento"
                label="Máquina/Implemento"
            />

            <Input
                label="Preço do combustível"
                placeholder="R$ 00,00"
                value={precoUnitarioCombustivel}
                onChangeText={(text) => setPrecoUnitarioCombustivel(text)}
                keyboard="numeric"
            />

            <Select
                dados={listaFatorPotencia}
                onChange={(value) => setFatorPotencia(value)}
                value={fatorPotencia}
                placeholder="Selecione o fator correspondente à intensidade de uso"
                label="Fator de potência"
            />

            <Input
                label="Tempo trabalhado"
                placeholder="Informe o tempo trabalhado"
                value={tempoTrabalhado}
                onChangeText={(text) => setTempoTrabalhado(text)}
                keyboard="numeric"
            />

            <RadioGroup
                radioButtons={opcaoUnidadeTempo}
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={styles.radioContainer}
            />

            <Input
                label="Distância trabalhada"
                placeholder="Informe a distância trabalhado"
                value={distanciaTrabalhada}
                onChangeText={(text) => setDistanciaTrabalhada(text)}
                keyboard="numeric"
            />


            <Botao nome="Salvar" onPress={salvar} disabled={false} />

            {toast &&
                <Toast setToast={setToast}
                    mensagem={mensagem}
                    gravidade={gravidade}
                />
            }


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: 17,
        flexGrow: 1,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        marginVertical: 20
    }
})