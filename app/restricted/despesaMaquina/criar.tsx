import Botao from "@/components/Botao";
import Input from "@/components/Input";
import InputData from "@/components/InputData";
import Select from "@/components/Select";
import Titulo from "@/components/Titulo";
import Toast from "@/components/Toast/Toast";
import database, { despesasMaquinasCollection, getTenant, maquinasCollection } from "@/db";
import DespesaMaquina from "@/db/model/DespesaMaquina";
import Maquina from "@/db/model/Maquina";
import Tenant from "@/db/model/Tenant";
import TipoCalculo from "@/utils/enums/TipoCalculo";
import TipoCombustivel from "@/utils/enums/TipoCombustivel";
import TipoInsumoMecanico from "@/utils/enums/TipoInsumoMecanico";
import TipoMecanico from "@/utils/enums/TipoMecanico";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CriarDespesaMaquina() {

    const { id } = useLocalSearchParams();

    const [despesaMaquina, setDespesaMaquina] = useState<DespesaMaquina>();
    const titulo = id ? "Editar Despesa com Máquina" : "Adicionar Despesa com Máquina";

    // variáveis de estado para exibir toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    //fetch maquinas
    const [maquinas, setMaquinas] = useState<any[]>([]);

    // variáveis de estado para os campos do formulário
    const [data, setData] = useState('');
    const [distanciaTrabalhada, setDistanciaTrabalhada] = useState('');
    const [fatorPotencia, setFatorPotencia] = useState('');
    const [litrosConsumidos, setLitrosConsumidos] = useState('');
    const [minutosTrabalhados, setMinutosTrabalhados] = useState('');
    const [precoUnitarioCombustivel, setPrecoUnitarioCombustivel] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [unidadeHoras, setUnidadeHoras] = useState('');
    const [tempoTrabalhado, setTempoTrabalhado] = useState('');
    const [maquina, setMaquina] = useState('');
    const [unidade, setUnidade] = useState<any>();
    const [tenant, setTenant] = useState<Tenant>();

    //edição de máquinas e implementos
    useEffect(() => {
        if (id) {
            //se for passado um id, buscar a máquina para edição
            const fetchDespesaMaquina = async () => {
                try {
                    const despesaMaquinaEncontrada = await despesasMaquinasCollection.find(String(id));
                    setDespesaMaquina(despesaMaquinaEncontrada);

                    setData(despesaMaquinaEncontrada.data.toDateString());
                    setDistanciaTrabalhada(despesaMaquinaEncontrada.distanciaTrabalhada.toString());
                    setFatorPotencia(despesaMaquinaEncontrada.fatorPotencia.toString());
                    setLitrosConsumidos(despesaMaquinaEncontrada.litrosConsumidos.toString());
                    setMinutosTrabalhados(despesaMaquinaEncontrada.minutosTrabalhados.toString());
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
                    d.data = new Date(data);
                    d.distanciaTrabalhada = parseFloat(distanciaTrabalhada);
                    d.fatorPotencia = fatorPotencia;
                    d.litrosConsumidos = parseFloat(litrosConsumidos);
                    d.minutosTrabalhados = parseFloat(minutosTrabalhados);
                    d.precoUnitarioCombustivel = parseFloat(precoUnitarioCombustivel);
                    d.valorTotal = parseFloat(valorTotal);
                    d.unidadeHoras = unidadeHoras === 'true';
                    d.tempoTrabalhado = parseFloat(tempoTrabalhado);
                    //@ts-ignore
                    d.maquina.id = maquina;
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



                    //@ts-ignore
                    novaDespesa.tenant.set(tenant);
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
                value={data}
                onChangeText={(text) => setData(text)}
            />

            <Select 
                dados={maquinas}
                onChange={(value) => setMaquina(value)} 
                value={maquina}
                placeholder="Selecione a máquina/implemento" 
                label="Máquina/Implemento"

            />

            {/* <Input
                label="Potência"
                placeholder="0,000 CV"
                value={potencia}
                onChangeText={(text) => setPotencia(text)}
                keyboard="numeric"
            />

            <Input
                label="Consumo médio"
                placeholder="0,000 km/L"
                value={consumoMedio}
                onChangeText={(text) => setConsumoMedio(text)}
                keyboard="numeric"
            />

            <Input
                label="Nome"
                placeholder={"Nome " + (tipoInsumo?.label ?? 'Máquina/Implemento')}
                value={nome}
                onChangeText={(text) => setNome(text)}
            />

            <Input
                label="Modelo"
                placeholder={"Modelo " + (tipoInsumo?.label ?? 'Máquina/Implemento')}
                value={modelo}
                onChangeText={(text) => setModelo(text)}
            />

            <Input
                label="Valor"
                placeholder="R$ 0,00"
                value={valor}
                onChangeText={(text) => setValor(text)}
                keyboard="numeric"
            />



            <Input
                label="Vida útil"
                placeholder="0"
                value={vidaUtil}
                onChangeText={(text) => setVidaUtil(text)}
                keyboard="numeric"
            />

            <Botao nome="Salvar" onPress={salvarMaquina} disabled={false} /> */}

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