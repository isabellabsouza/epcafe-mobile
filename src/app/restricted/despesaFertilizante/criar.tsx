import Botao from "@/src/components/Botao";
import InputFerTalhao from "@/src/components/depesaFertilizante/InputFerTalhao";
import MontaObject from "@/src/components/FormFactory/MontaObject";
import InputData from "@/src/components/Formulario/InputData";
import Select from "@/src/components/Formulario/Select";
import Titulo from "@/src/components/Titulo";
import Toast from "@/src/components/toast/Toast";
import database, { despesasFerTalhoesCollection, despesasFertilizantesCollection, fertilizantesCollection, getFertilizante, getTenant, itensCollection, notasCollection, talhoesCollection } from "@/src/db";
import DespesaFerTalhao from "@/src/db/model/DespesaFerTalhao";
import DespesaFertilizante from "@/src/db/model/DespesaFertilizante";
import Fertilizante from "@/src/db/model/Fertilizante";
import Item from "@/src/db/model/Item";
import NotaFiscal from "@/src/db/model/NotaFiscal";
import Tenant from "@/src/db/model/Tenant";
import TipoFertilizante from "@/src/utils/enums/TipoFertilizante";
import { buscarTenantId, buscarUnidadeId } from "@/src/utils/functions/Storage";
import { Q } from "@nozbe/watermelondb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CriarDespesaFertilizante() {

    const { id } = useLocalSearchParams();

    const [Id, setId] = useState(id);

    const [despesaFertilizante, setDespesaFertilizante] = useState<DespesaFertilizante>();
    const titulo = Id ?
        "Editar Despesa com Fertilizantes e Defensivos" :
        "Adicionar Despesa com Fertilizantes e Defensivos";

    // variáveis de estado para exibir toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    // variáveis de estado para os campos do formulário
    const [data, setData] = useState('');
    const [medida, setMedida] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [fertilizante, setFertilizante] = useState<Fertilizante | null>();
    const [tipoInsumo, setTipoInsumo] = useState<any>({ label: '', value: '' });
    const [notaFiscal, setNotaFiscal] = useState<NotaFiscal>();
    const [unidade, setUnidade] = useState<any>();
    const [tenant, setTenant] = useState<string | null>('');
    const [fertilizanteSelecionado, setFertilizanteSelecionado] = useState<string | null>(null);
    const [valorItem, setValorItem] = useState(0);
    const [quantidadeItem, setQuantidadeItem] = useState(0);

    // definição das listas de opções para os selects
    const [notasFiscais, setNotasFiscais] = useState<any[]>([]);
    const [fertilizantes, setFertilizantes] = useState<any[]>([]);

    const [page, setPage] = useState(0);


    const tipos = Array.from(Object.keys(TipoFertilizante)).map((key, index) => {
        return {
            label: Array.from(Object.values(TipoFertilizante))[index].toString(),
            value: key,
        }
    })

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


    //edição de máquinas e implementos
    useEffect(() => {
        if (Id) {
            //se for passado um id, buscar a máquina para edição
            const fetchDespesaFertilizante = async () => {
                try {
                    const despesaFertilizanteEncontrada = await despesasFertilizantesCollection.find(String(id));
                    setDespesaFertilizante(despesaFertilizanteEncontrada);

                    setData(despesaFertilizanteEncontrada.data.toDateString());
                    setMedida(despesaFertilizanteEncontrada.medida);
                    setValorTotal(despesaFertilizanteEncontrada.valorTotal.toString());
                    //@ts-ignore
                    setFertilizante(despesaFertilizanteEncontrada.fertilizante.id.toString());
                    //@ts-ignore
                    setNotaFiscal(despesaFertilizanteEncontrada.notaFiscal.id);
                    //@ts-ignore
                    setUnidade(despesaFertilizanteEncontrada.unidade.id);
                    //@ts-ignore
                    setTenant(despesaFertilizanteEncontrada.tenant.id);

                } catch (error) {
                    console.error("Erro ao buscar a despesa:", error);
                }
            };

            fetchDespesaFertilizante();
        }
    }, [Id]);

    //buscar fertilizantes
    useEffect(() => {

        const fetchFertilizantes = async () => {
            try {
                const fertilizantesEncontrados = await fertilizantesCollection
                    .query(
                        //@ts-ignore
                        Q.where('tipo', tipoInsumo.value),
                        Q.sortBy('id')
                    )
                    .fetch();

                const fertilizantes = fertilizantesEncontrados.map((fertilizante) => {
                    return {
                        label: fertilizante.nome,
                        value: fertilizante.id
                    }
                })
                setFertilizantes(fertilizantes);
                // console.log("Fertilizantes:", fertilizantesEncontradas);
            } catch (error) {
                console.error("Erro ao buscar os fertilizantes:", error);
            }
        };

        fetchFertilizantes();
    }, [tipoInsumo]);

    const buscarNotasFiscais = async (fertilizanteId: string) => {
        try {
            console.log("Fertilizante Selecionado: ", fertilizanteId);
            const itensPorFertilizante =
                await database.get<Item>('item')
                    .query(
                        //@ts-ignore
                        Q.where('fertilizante_id', fertilizanteId.value)
                    )
                    .fetch();
            
            console.log('itens:', itensPorFertilizante);
            
            const notas = await Promise.all(itensPorFertilizante.map(async (item) => {
                console.log('Nota fiscal do item:', item.notaFiscal.id);
                const notaFiscal = await notasCollection.find(item.notaFiscal.id);
                console.log('Nota fiscal:', notaFiscal.numero);
                return {
                    label: notaFiscal.numero,
                    value: notaFiscal.id,
                    medida: item.medida,
                    valor: item.valor,
                    quantidade: item.quantidade,
                }
            }));

            setNotasFiscais(notas);
            
        } catch (error) {
            console.log('Erro ao buscar notas fiscais com itens:', error);
        }
    }

    const handleFertilizanteChange = (value: string) => {
        setFertilizanteSelecionado(value);
        buscarNotasFiscais(value); // Buscar notas fiscais com base no fertilizante selecionado
    };

    const salvarDespesaFertilizante = async () => {
        if (despesaFertilizante) {

            // Se a despesa já existe, atualizar
            await database.write(async () => {
                await despesaFertilizante.update((d) => {
                    d.data = new Date(data);
                    d.medida = medida;
                    d.valorTotal = parseFloat(valorTotal);

                    //@ts-ignore
                    d.fertilizante.id = fertilizante;
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
            console.log("Medida:", medida);
            await database.write(async () => {
                const despesa = await despesasFertilizantesCollection.create((novaDespesa) => {
                    
                    novaDespesa.data = new Date(data);
                    //@ts-ignore
                    novaDespesa.fertilizante.id = fertilizanteSelecionado.value;
                    //@ts-ignore
                    novaDespesa.notaFiscal.id = notaFiscal.value;
                    //@ts-ignore
                    novaDespesa.medida = medida;
                    novaDespesa.valorTotal = 0;
                    //@ts-ignore
                    novaDespesa.tenant.id = tenant;
                    //@ts-ignore
                    novaDespesa.unidade.id = unidade;
                    console.log('novaDespesa', novaDespesa);
                });
                console.log('despesa id dessa porra', despesa.id);
                setId(despesa.id);

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
    const [despesasFerTalhao, setDespesasFerTalhao] = useState<DespesaFerTalhao[]>();

    useEffect(() => {
        if (!Id || page <= 0) return;

        despesasFerTalhoesCollection
            .query(
                Q.where('despesa_id', Id as string)
            )
            .fetch()
            .then((despesasFerTalhao) => {
                console.log('despesasFerTalhao', despesasFerTalhao);
                if (despesasFerTalhao.length === 0) {
                    console.log('não há despesas de fertilizantes nos talhões, distribuir');
                    talhoesCollection
                        .query()
                        .fetch()
                        .then((talhoes) => {
                            database.write(async () => {
                                let despesas = [];
                                for (let i = 0; i < talhoes.length; i++) {
                                    const talhao = talhoes[i];
                                    despesas.push(
                                        await despesasFerTalhoesCollection.create((novaDespesaFerTalhao) => {
                                            novaDespesaFerTalhao.quantidade = 0;
                                            novaDespesaFerTalhao.valor = 0;
                                            //@ts-ignore
                                            novaDespesaFerTalhao.talhao.set(talhao);
                                            //@ts-ignore
                                            novaDespesaFerTalhao.despesaFertilizante.set(despesaFertilizante);
                                            //@ts-ignore
                                            //novaDespesaFerTalhao.tenant.set(tenant);
                                            console.log('novaDespesaFerTalhao', novaDespesaFerTalhao);
                                        })
                                    );
                                }
                                setDespesasFerTalhao(despesas);
                            })
                                .then(() => {
                                    console.log('despesas de fertilizantes distribuídas nos talhões');
                                })
                                .catch((error) => {
                                    console.error("Erro ao distribuir as despesas de fertilizantes nos talhões:", error);
                                })
                        })
                } else {
                    console.log('há despesas de fertilizantes nos talhões');
                    setDespesasFerTalhao(despesasFerTalhao);
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar as despesas de fertilizantes nos talhões:", error);
            })
    }, [Id, page])

    const [unidadeId, setUnidadeId] = useState('');

    useEffect(() => {
        if(page === 1)
            buscarUnidade();
    }, [page]);

    const buscarUnidade = async () => {
        let unidade = await AsyncStorage.getItem('unidade');
        console.log('UNIDADE', unidade);
        if(unidade)
            setUnidadeId(unidade);
    }

    const [talhoes, setTalhoes] = useState<any[]>([]);
    const [salvar, setSalvar] = useState(false);
    const distribuirFerTalhao = () => {

        console.log('DESPESASSS', despesasFerTalhao);
        if(!talhoes || talhoes.length === 0)
            talhoesCollection
                .query(
                    Q.where('unidade_id', unidadeId)
                )
                .fetch()
                .then((talhoes) => {
                    console.log('TALHOES', talhoes);
                    setTalhoes(talhoes);
                })

            console.log('Despesa Fertilizante::', Id)

        return (
            <ScrollView contentContainerStyle={styles.scrollContent} >
                <Titulo titulo="Distribuir nos Talhões" />

                <Text >Quantidade para distribuir: {quantidadeItem} {medida}</Text>
                {talhoes.map((talhao) => {
                    
                    return (
                        <InputFerTalhao
                            key={talhao.id}
                            label={talhao.nome}
                            placeholder="Digite a quantidade"
                            precoCompra={valorItem}
                            despesaFertilizanteId={Id as string}
                            talhao={talhao}
                            salvar={salvar}
                            setSalvar={setSalvar}
                        />
                    )
                })}

                <Botao nome="Salvar" onPress={() => setSalvar(true)} disabled={false} />
            </ScrollView>
        )



    }

    const criarDespesaFertilizante = () => {
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
                    dados={tipos}
                    onChange={(value) => {setTipoInsumo(value)}}
                    value={tipoInsumo}
                    placeholder="Selecione o tipo de insumo"
                    label="Tipo de insumo"
                />

                <Select
                    dados={fertilizantes}
                    onChange={(value) => handleFertilizanteChange(value)}
                    value={fertilizanteSelecionado ?? ''}
                    placeholder={"Selecione o tipo de " + (tipoInsumo?.label ?? 'Fertilizante/Defensivo')}
                    label={"Selecione o " + (tipoInsumo?.label ?? 'Fertilizante/Defensivo')}
                />
                
                <Select
                    dados={notasFiscais}
                    onChange={(value) => {
                        setNotaFiscal(value),
                        setMedida(value.medida),
                        setValorItem(value.valor),
                        console.log('VALOR ITEM', value.valor),
                        setQuantidadeItem(value.quantidade)
                    }}
                    value={notaFiscal?.id ?? ''}
                    placeholder="Selecione a nota fiscal"
                    label="Nota Fiscal"
                />


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Botao nome="Salvar" onPress={salvarDespesaFertilizante} disabled={false} />
                    {
                        Id &&
                        <Botao nome="Teste" onPress={() => setPage(1)} disabled={false} />
                    }
                </View>
                {toast &&
                    <Toast setToast={setToast}
                        mensagem={mensagem}
                        gravidade={gravidade}
                    />
                }


            </ScrollView>
        )
    }

    return page > 0 ? distribuirFerTalhao() : criarDespesaFertilizante();
}


const styles = StyleSheet.create({
    scrollContent: {
        padding: 17,
        flexGrow: 1,
    },
})