import Botao from "@/src/components/Botao";
import Input from "@/src/components/Formulario/Input";
import InputData from "@/src/components/Formulario/InputData";
import Select from "@/src/components/Formulario/Select";
import Titulo from "@/src/components/Titulo";
import Toast from "@/src/components/toast/Toast";
import database, { despesasMaquinasCollection, maquinasCollection } from "@/src/db";
import DespesaMaquina from "@/src/db/model/DespesaMaquina";
import FatorPotencia from "@/src/utils/enums/FatorPotencia";
import { buscarTenantId, buscarUnidadeId } from "@/src/utils/functions/Storage";
import { Q } from "@nozbe/watermelondb";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

export default function CriarDespesaMaquina() {
    function converterHoraParaMinuto(tempo: number) {
        return tempo * 60;
    }

    function calcularValorTotal(despesaMaquina: any) {
        console.log("Calculando valor total da despesa...");
        let valor = 0;

        //@ts-ignore
        const tipoCalculo = maquina.tipoCalculo;
        //@ts-ignore
        const consumoMedio = maquina.consumoMedio;
        //@ts-ignore
        const potencia = maquina.potencia;

        const tempoConvertido = selectedId === '0'
            ? converterHoraParaMinuto(parseFloat(tempoTrabalhado))
            : parseFloat(tempoTrabalhado);

        switch (tipoCalculo) {
            case 'TRATOR':
                valor = (
                    potencia *
                    //@ts-ignore
                    (fatorPotencia.valor / 100) *
                    0.15 *
                    parseFloat(precoUnitarioCombustivel) *
                    (tempoConvertido / 60)
                );
                break;

            case 'NAO_TRATOR':
                valor = (
                    potencia *
                    0.15 *
                    parseFloat(precoUnitarioCombustivel) *
                    (tempoConvertido / 60)
                );
                break;

            case 'ENERGIA_ELETRICA':
                valor = (
                    potencia *
                    0.735 *
                    parseFloat(precoUnitarioCombustivel) *
                    (tempoConvertido / 60)
                );
                break;

            case 'DISTANCIA':
                valor = (
                    parseFloat(distanciaTrabalhada) /
                    consumoMedio *
                    parseFloat(precoUnitarioCombustivel)
                );
                break;

            default:
                valor = 0;
                break;
        }

        return Number(valor.toFixed(2));
    }


    const { id } = useLocalSearchParams();

    const [despesaMaquina, setDespesaMaquina] = useState<DespesaMaquina>();
    const titulo = id ? "Editar Despesa com Máquina" : "Adicionar Despesa com Máquina";
    const [selectedId, setSelectedId] = useState<string | undefined>();

    // variáveis de estado para exibir toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    // variáveis de estado para os campos do formulário
    const [data, setData] = useState<Date>();
    const [distanciaTrabalhada, setDistanciaTrabalhada] = useState('');
    const [fatorPotencia, setFatorPotencia] = useState('');
    const [precoUnitarioCombustivel, setPrecoUnitarioCombustivel] = useState('');
    const [valorTotal, setValorTotal] = useState(0);
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
        {
            id: '0',
            label: 'Horas',
            value: 'Horas'
        },
        {
            id: '1',
            label: 'Minutos',
            value: 'Minutos'
        }
    ]), []);

    useEffect(() => {
        const buscarTenantUnidade = async () => {
            const tenantId = await buscarTenantId();
            setTenant(tenantId);
            console.log('tenantId', tenant);

            const unidadeId = await buscarUnidadeId();
            setUnidade(unidadeId);
            console.log('unidadeId', unidade);
        };
        buscarTenantUnidade();
    }, []);

    useEffect(() => {
        const buscarMaquinas = async () => {
            if (tenant && unidade) {
                try {
                    const maquinasEncontradas =
                        await maquinasCollection.query(
                            Q.where('tenant_id', Q.eq(tenant))
                        ).fetch();

                    const maquinas = maquinasEncontradas.map((maquina) => {
                        return {
                            label: maquina.nome,
                            value: maquina.id,
                            tipoCalculo: maquina.tipoCalculo,
                            consumoMedio: maquina.consumoMedio,
                            potencia: maquina.potencia,
                        }
                    })
                    setMaquinas(maquinas);

                } catch (error) {
                    console.error("Erro ao buscar as máquinas:", error);
                }
            }
        };
        if (tenant && unidade) {
            buscarMaquinas();
        }
    }, [tenant, unidade]);

    //edição de máquinas e implementos
    useEffect(() => {
        if (id) {
            let valorTotal = calcularValorTotal(despesaMaquina);
            //se for passado um id, buscar a máquina para edição
            const fetchDespesaMaquina = async () => {
                try {
                    const despesaMaquinaEncontrada = await despesasMaquinasCollection.find(String(id));
                    
                    //console.log("UnidadeTempo ", despesaMaquinaEncontrada.unidadeHoras)
                    setDespesaMaquina(despesaMaquinaEncontrada);
                    setData(despesaMaquinaEncontrada.data);
                    setDistanciaTrabalhada(despesaMaquinaEncontrada.distanciaTrabalhada.toString());
                    setFatorPotencia(despesaMaquinaEncontrada.fatorPotencia.toString());
                    setPrecoUnitarioCombustivel(despesaMaquinaEncontrada.precoUnitarioCombustivel.toString());
                    setValorTotal(valorTotal);
                    setUnidadeHoras(despesaMaquinaEncontrada.unidadeHoras);
                    setTempoTrabalhado(despesaMaquinaEncontrada.tempoTrabalhado.toString());
                    setMaquina(despesaMaquinaEncontrada.maquina.id);

                } catch (error) {
                    console.error("Erro ao buscar a despesa:", error);
                }
            };

            fetchDespesaMaquina();
        }
    }, [id]);



    //salvar despesa maquina
    const salvarDespesaMaquina = async () => {
        if (despesaMaquina) {
            let valorTotal = calcularValorTotal(despesaMaquina);
            // Se a despesa já existe, atualizar
            await database.write(async () => {
                await despesaMaquina.update((d) => {
                    d.data = data!;
                    d.distanciaTrabalhada = parseFloat(distanciaTrabalhada);
                    //@ts-ignore
                    d.fatorPotencia = fatorPotencia.value.toString();
                    d.precoUnitarioCombustivel = parseFloat(precoUnitarioCombustivel);
                    d.valorTotal = valorTotal;
                    d.unidadeHoras = selectedId === '0' ? false : true;
                    d.tempoTrabalhado = parseFloat(tempoTrabalhado);
                    //@ts-ignore
                    d.maquina.id = maquina.value;
                    //@ts-ignore
                    d.unidade.id = unidade;

                });
            }).then(() => {

                setGravidade('sucesso');
                setMensagem('Despesa atualizada com sucesso!');
                setToast(true);

                console.log("Despesa atualizada com sucesso!");
            }).catch((error) => {
                setGravidade('erro');
                setMensagem('Erro ao atualizar a despesa');
                setToast(true);
                console.error("Erro ao atualizar a despesa:", error);
            });

        } else {
            // Se a despesa não existe, criar
            let valorTotal = calcularValorTotal(despesaMaquina);
            await database.write(async () => {
                await despesasMaquinasCollection.create((novaDespesa) => {

                    novaDespesa.data = data!;
                    //@ts-ignore
                    novaDespesa.maquina.id = maquina.value;
                    novaDespesa.precoUnitarioCombustivel = parseFloat(precoUnitarioCombustivel);
                    //@ts-ignore
                    novaDespesa.fatorPotencia = fatorPotencia.value.toString();
                    novaDespesa.unidadeHoras = selectedId === '0' ? false : true;
                    novaDespesa.tempoTrabalhado = parseFloat(tempoTrabalhado);
                    novaDespesa.distanciaTrabalhada = parseFloat(distanciaTrabalhada);
                    novaDespesa.valorTotal = valorTotal;
                    //@ts-ignore
                    novaDespesa.tenant.id = tenant;
                    //@ts-ignore
                    novaDespesa.unidade.id = unidade;
                    console.log('novaDespesa', novaDespesa);


                });
            }).then(() => {

                setGravidade('sucesso');
                setMensagem('Despesa criada com sucesso!');
                setToast(true);

                console.log("Despesa criada com sucesso!");
            }).catch((error) => {
                setGravidade('erro');
                setMensagem('Erro ao criar despesa');
                setToast(true);
                console.error("Erro ao criar despesa:", error);
            });

        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} >
            <Titulo titulo={titulo}></Titulo>

            <InputData
                label="Data"
                placeholder="Selecione a data da despesa"
                value={data?.toDateString() || ''}
                onChangeText={(text) => { console.log('text :)', text); setData(text) }}
            />

            <Select
                dados={maquinas}
                onChange={(value) => {
                    setMaquina(value)
                    console.log('maquina', maquina)
                }

                }
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


            <Botao nome="Salvar" onPress={salvarDespesaMaquina} disabled={false} />

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