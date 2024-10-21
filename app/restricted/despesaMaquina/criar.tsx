import Botao from "@/components/Botao";
import Input from "@/components/Input";
import InputData from "@/components/InputData";
import RadioSelect from "@/components/RadioSelect";
import Select from "@/components/Select";
import Titulo from "@/components/Titulo";
import Toast from "@/components/Toast/Toast";
import database, { despesasMaquinasCollection, getTenant, maquinasCollection } from "@/db";
import DespesaMaquina from "@/db/model/DespesaMaquina";
import Maquina from "@/db/model/Maquina";
import Tenant from "@/db/model/Tenant";
import FatorPotencia from "@/utils/enums/FatorPotencia";
import TipoCalculo from "@/utils/enums/TipoCalculo";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";

export default function CriarDespesaMaquina() {
    function converterHoraParaMinuto(tempo: number) {
        return tempo * 60;
    }
    
    function calcularValorTotal(despesaMaquina: any) {
        console.log("Entrou")
        let valor = 0;
        
        console.log("tipoCalculo: ", maquina.TipoCalculo)
        console.log("consumoMedio: ", maquina.consumoMedio)
        console.log("potencia: ", fatorPotencia.valor)
        console.log("Unidade Horas: ", selectedId)
        //const { tipoCalculo, potencia, consumoMedio } = despesaMaquina.maquina;
        const tipoCalculo = maquina.tipoCalculo;
        const consumoMedio = maquina.consumoMedio;
        const potencia = maquina.potencia;
        const tempoConvertido = selectedId === '0'
            ? converterHoraParaMinuto(parseFloat(tempoTrabalhado))
            : parseFloat(tempoTrabalhado);
    
        switch (tipoCalculo) {
            case 'TRATOR':
                valor = (
                    potencia *
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
    const [valorTotal, setValorTotal] = useState('');
    const [unidadeHoras, setUnidadeHoras] = useState<boolean>(false);
    const [tempoTrabalhado, setTempoTrabalhado] = useState('');
    const [maquina, setMaquina] = useState('');
    const [unidade, setUnidade] = useState<any>();
    const [tenant, setTenant] = useState<Tenant>();

    // definição das listas de opções para os selects
    const [maquinas, setMaquinas] = useState<any[]>([]);
    const listaFatorPotencia = Array.from(Object.keys(FatorPotencia))
        .filter(key => key !== 'getNome')
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

    //edição de máquinas e implementos
    useEffect(() => {
        if (id) {
            //se for passado um id, buscar a máquina para edição
            const fetchDespesaMaquina = async () => {
                try {
                    const despesaMaquinaEncontrada = await despesasMaquinasCollection.find(String(id));
                    setDespesaMaquina(despesaMaquinaEncontrada);

                    setData(despesaMaquinaEncontrada.data);
                    setDistanciaTrabalhada(despesaMaquinaEncontrada.distanciaTrabalhada.toString());
                    setFatorPotencia(despesaMaquinaEncontrada.fatorPotencia.toString());
                    setPrecoUnitarioCombustivel(despesaMaquinaEncontrada.precoUnitarioCombustivel.toString());
                    setValorTotal(despesaMaquinaEncontrada.valorTotal.toString());
                    setUnidadeHoras(despesaMaquinaEncontrada.unidadeHoras.toString());
                    setTempoTrabalhado(despesaMaquinaEncontrada.tempoTrabalhado.toString());
                    setMaquina(despesaMaquinaEncontrada.maquina.id);

                } catch (error) {
                    console.error("Erro ao buscar a despesa:", error);
                }
            };

            fetchDespesaMaquina();
        }
    }, [id]);

    useEffect(() => {
        const fetchMaquinas = async () => {
            try {
                const maquinasEncontradas = await maquinasCollection.query().fetch();

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
                console.log("Maquinas:", maquinasEncontradas);
            } catch (error) {
                console.error("Erro ao buscar as máquinas:", error);
            }
        };
        fetchMaquinas();
    }, []);

    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const fetchedTenant = await getTenant;
                setTenant(fetchedTenant);
                console.log("Tenant:", fetchedTenant.tenant);
            } catch (error) {
                console.error("Erro ao buscar o tenant:", error);
            }
        };
        fetchTenant();
    }, []);

    // const salvarDespesaMaquina = async () => {
    //     const novaDespesa: {
    //         data: Date | undefined;
    //         distanciaTrabalhada: number;
    //         fatorPotencia: number;
    //         precoUnitarioCombustivel: number;
    //         unidadeHoras: boolean;
    //         tempoTrabalhado: number;
    //         maquina: any;
    //         valorTotal?: number;
    //     } = {
    //         data,
    //         distanciaTrabalhada: parseFloat(distanciaTrabalhada) || 0,
    //         fatorPotencia: parseFloat(fatorPotencia) || 0,
    //         precoUnitarioCombustivel: parseFloat(precoUnitarioCombustivel) || 0,
    //         unidadeHoras: unidadeHoras === 'true',
    //         tempoTrabalhado: parseFloat(tempoTrabalhado) || 0,
    //         maquina: maquinas.find(m => m.value === maquina),
    //     };
    
    //     // Calcular o valor total
    //     const valorCalculado = calcularValorTotal(novaDespesa);
    //     novaDespesa.valorTotal = valorCalculado;
    
    //     try {
    //         if (despesaMaquina) {
    //             // Atualizar despesa existente
    //             await database.write(async () => {
    //                 await despesaMaquina.update((d) => {
    //                     Object.assign(d, novaDespesa);
    //                 });
    //             });
    //         } else {
    //             // Criar nova despesa
    //             await database.write(async () => {
    //                 await despesasMaquinasCollection.create((novaDespesaDB) => {
    //                     Object.assign(novaDespesaDB, novaDespesa);
    //                 });
    //             });
    //         }
    
    //         setGravidade('sucesso');
    //         setMensagem('Despesa salva com sucesso!');
    //     } catch (error) {
    //         setGravidade('erro');
    //         setMensagem('Erro ao salvar a despesa');
    //         console.error('Erro ao salvar a despesa:', error);
    //     } finally {
    //         setToast(true);
    //     }
    // };
    

    //salvar despesa maquina
    const salvarDespesaMaquina = async () => {
        if (despesaMaquina) {

            // Se a despesa já existe, atualizar
            await database.write(async () => {
                await despesaMaquina.update((d) => {
                    d.data = data!;
                    d.distanciaTrabalhada = parseFloat(distanciaTrabalhada);
                    d.fatorPotencia = fatorPotencia;
                    d.precoUnitarioCombustivel = parseFloat(precoUnitarioCombustivel);
                    d.valorTotal = parseFloat(valorTotal);
                    d.unidadeHoras = unidadeHoras === 'true';
                    d.tempoTrabalhado = parseFloat(tempoTrabalhado);
                    //@ts-ignore
                    d.maquina.id = maquina.value;
                    console.log('despesa editada', d)

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
            console.log('valorTotal', valorTotal);
            await database.write(async () => {
                await despesasMaquinasCollection.create((novaDespesa) => {

                    novaDespesa.data = data!; //FIXME: data não pode ser nula
                    //@ts-ignore
                    // novaDespesa.maquina.set(maquina);
                    //@ts-ignore
                    novaDespesa.maquina.id = maquina.value;
                    novaDespesa.precoUnitarioCombustivel = parseFloat(precoUnitarioCombustivel);
                    novaDespesa.fatorPotencia = fatorPotencia;
                    novaDespesa.unidadeHoras = unidadeHoras === 'true';
                    novaDespesa.tempoTrabalhado = parseFloat(tempoTrabalhado);
                    novaDespesa.distanciaTrabalhada = parseFloat(distanciaTrabalhada);
                    novaDespesa.valorTotal = valorTotal;
                    //@ts-ignore
                    //novaDespesa.tenant.set(tenant);
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

            {/* {
                FormFactory.createForm(maquinasCollection, montaObject, [], maquina)
            } */}

            <InputData
                label="Data"
                placeholder="Selecione a data da despesa"
                value={data?.toDateString() || ''}
                onChangeText={(text) => {console.log('text :)', text); setData(text)}}
            />

            <Select
                dados={maquinas}
                onChange={(value) =>
                {
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
            />

            <Select
                dados={listaFatorPotencia}
                onChange={(value) => setFatorPotencia(value)}
                value={fatorPotencia}
                placeholder="Selecione o fator correspondente à intensidade de uso"
                label="Fator de potência"
            />

            {/* <RadioSelect
                label="Unidade de tempo"
                dados={opcaoUnidadeTempo}
                onChange={(value) => {
                    const isHoras = value === 'Horas'; // Verifica se a opção é "Horas"
                    setUnidadeHoras(isHoras); // Armazena 'true' ou 'false' como string
                }}
            /> */}

            <RadioGroup
                radioButtons={opcaoUnidadeTempo}
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={styles.radioContainer}
            />

            <Input
                label="Tempo trabalhado"
                placeholder="Informe o tempo trabalhado"
                value={tempoTrabalhado}
                onChangeText={(text) => setTempoTrabalhado(text)}
                keyboard="numeric"
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