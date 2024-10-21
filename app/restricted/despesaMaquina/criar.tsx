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
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RadioButtonProps } from "react-native-radio-buttons-group";

export default function CriarDespesaMaquina() {

    const { id } = useLocalSearchParams();

    const [despesaMaquina, setDespesaMaquina] = useState<DespesaMaquina>();
    const titulo = id ? "Editar Despesa com Máquina" : "Adicionar Despesa com Máquina";

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
    const [unidadeHoras, setUnidadeHoras] = useState('');
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
                    value: key
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
                        value: maquina.id
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


    //salvar despesa maquina
    const salvarDespesaMaquina = async () => {
        if (despesaMaquina) {

            // Se a despesa já existe, atualizar
            await database.write(async () => {
                await despesaMaquina.update((d) => {
                    d.data = data!; //FIXME: data não pode ser nula
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
                    novaDespesa.valorTotal = 1000;
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

            <RadioSelect
                label="Unidade de tempo"
                dados={opcaoUnidadeTempo}
            />

            <Input
                label="Tempo trabalhado"
                placeholder="Informe o tempo trabalhado"
                value={tempoTrabalhado}
                onChangeText={(text) => setTempoTrabalhado(text)}
            />

            <Input
                label="Distância trabalhada"
                placeholder="Informe a distância trabalhado"
                value={distanciaTrabalhada}
                onChangeText={(text) => setDistanciaTrabalhada(text)}
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
})