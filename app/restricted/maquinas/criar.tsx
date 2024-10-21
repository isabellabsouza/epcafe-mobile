import Botao from "@/components/Botao";
import MontaObject from "@/components/FormFactory/MontaObject";
import Input from "@/components/Input";
import InputData from "@/components/InputData";
import Select from "@/components/Select";
import Titulo from "@/components/Titulo";
import Toast from "@/components/Toast/Toast";
import database, { getTenant, maquinasCollection, tenantsCollection } from "@/db";
import Maquina from "@/db/model/Maquina";
import Tenant from "@/db/model/Tenant";
import TipoCalculo from "@/utils/enums/TipoCalculo";
import TipoCombustivel from "@/utils/enums/TipoCombustivel";
import TipoInsumoMecanico from "@/utils/enums/TipoInsumoMecanico";
import TipoMecanico from "@/utils/enums/TipoMecanico";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CriarMaquina() {

    const { id } = useLocalSearchParams();

    const [maquina, setMaquina] = useState<Maquina>();
    const titulo = id ? "Editar Máquina ou Implemento" : "Adicionar Máquina ou Implemento";

    // variáveis de estado para exibir toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    // variáveis de estado para os campos do formulário
    const [tipoInsumo, setTipoInsumo] = useState<any>();
    const [tipo, setTipo] = useState<any>( {label: '', value: ''} );
    const [tipoCombustivel, setTipoCombustivel] = useState<any>( {label: '', value: ''} );
    const [tipoCalculo, setTipoCalculo] = useState<any>( {label: '', value: ''} );
    const [potencia, setPotencia] = useState('');
    const [consumoMedio, setConsumoMedio] = useState('');
    const [nome, setNome] = useState('');
    const [modelo, setModelo] = useState('');
    const [valor, setValor] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [vidaUtil, setVidaUtil] = useState('');
    const [tenant, setTenant] = useState<Tenant>();

    // definição da lista de renderização dinamica de tipos   
    const [tipos, setTipos] = useState<any[]>([]);

    // definição das listas de opções para os selects
    const tiposInsumosMecanicos = Array.from(Object.keys(TipoInsumoMecanico)).map((key, index) => {
        return {
            label: Array.from(Object.values(TipoInsumoMecanico))[index].toString(),
            value: key,
        }
    })
    
    const tiposCalculos = Array.from(Object.keys(TipoCalculo)).map((key, index) => {
        return {
            label: Array.from(Object.values(TipoCalculo))[index].toString(),
            value: key,
        }
    })

    const tiposCombustiveis = Array.from(Object.keys(TipoCombustivel)).map((key, index) => {
        return {
            label: Array.from(Object.values(TipoCombustivel))[index].toString(),
            value: key,
        }
    })


    //atualiza a lista de tipos de acordo com o tipo de insumo selecionado
    useEffect(() => {
        console.log('tipoInsumo', tipoInsumo)
        if(tipoInsumo?.label === ''){
            setTipos([]);
            return;
        }
        if(tipoInsumo?.label === TipoInsumoMecanico.MAQUINA){
            console.log("setting tipos maquina")
            setTipos(Array.from(Object.keys(TipoMecanico.MAQUINAS)).map((key, index) => {
                return {
                    label: Array.from(Object.values(TipoMecanico.MAQUINAS))[index].nome,
                    value: key,
                }
            }))
        }
        if(tipoInsumo?.label === TipoInsumoMecanico.IMPLEMENTO){
            console.log("setting tipos implemento")
            setTipos(Array.from(Object.keys(TipoMecanico.IMPLEMENTOS)).map((key, index) => {
                // console.log(Array.from(Object.values(TipoMecanico.IMPLEMENTOS))[index].nome)
                return {
                    // label: Array.from(Object.values(TipoMecanico.IMPLEMENTOS))[index].toString(),
                    value: key,
                    label: Array.from(Object.values(TipoMecanico.IMPLEMENTOS))[index].nome,
                }
            }))
        }
    }, [tipoInsumo])


    //edição de máquinas e implementos
    useEffect(() => {
        if (id) {
            //se for passado um id, buscar a máquina para edição
            const fetchMaquina = async () => {
                try {
                    const maquinaEncontrada = await maquinasCollection.find(String(id));
                    setMaquina(maquinaEncontrada);

                    setTipoInsumo({
                        label: TipoInsumoMecanico[maquinaEncontrada.tipoInsumo as keyof typeof TipoInsumoMecanico],
                        value: maquinaEncontrada.tipoInsumo,
                    });
                    setTipo({
                        label: (TipoMecanico as any)[maquinaEncontrada.tipo]?.nome || '',
                        value: maquinaEncontrada.tipo,
                    });
                    setTipoCombustivel({
                        label: TipoCombustivel[maquinaEncontrada.tipoCombustivel as keyof typeof TipoCombustivel],
                        value: maquinaEncontrada.tipoCombustivel,
                    });
                    setTipoCalculo({
                        label: TipoCalculo[maquinaEncontrada.tipoCalculo as keyof typeof TipoCalculo],
                        value: maquinaEncontrada.tipoCalculo,
                    });
                    setPotencia(maquinaEncontrada.potencia.toString());
                    setConsumoMedio(maquinaEncontrada.consumoMedio.toString());
                    setNome(maquinaEncontrada.nome);
                    setModelo(maquinaEncontrada.modelo);
                    setValor(maquinaEncontrada.valor.toString());
                    setDataCompra(maquinaEncontrada.dataCompra.toISOString());
                    setVidaUtil(maquinaEncontrada.vidaUtil.toString());


                } catch (error) {
                    console.error("Erro ao buscar a máquina:", error);
                }
            };

            fetchMaquina();
        }
    }, [id]);

    useEffect(() => {
        const fetchTenant = async () => {
            const tenants = await tenantsCollection.query().fetch();
            console.log("Tenants:", tenants);
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


    //salvar máquina ou implemento
    const salvarMaquina = async () => {
        if (maquina) {
            //let values = montaObject;
            // Se a máquina já existe, atualizar
            await database.write(async () => {
                await maquina.update((m) => {
                    m.nome = nome;
                    m.consumoMedio = parseFloat(consumoMedio);
                    m.dataCompra = new Date(dataCompra);
                    m.modelo = modelo;
                    m.potencia = parseFloat(potencia);
                    m.tipo = tipo.value;
                    m.tipoCalculo = tipoCalculo.value;
                    m.tipoCombustivel = tipoCombustivel.value;
                    m.tipoInsumo = tipoInsumo.value;
                    m.valor = parseFloat(valor);
                    m.vidaUtil = parseInt(vidaUtil);
                    //@ts-ignore
                    m.tenant.set(tenant);
                    console.log('maquina editada', m)

                });
            }).then(() => {

                setGravidade('sucesso');
                setMensagem('Máquina atualizada com sucesso!');
                setToast(true);

                console.log("Máquina atualizada com sucesso!");
            }).catch((error) => {
                setGravidade('erro');
                setMensagem('Erro ao atualizar a máquina');
                setToast(true);
                console.error("Erro ao atualizar a máquina:", error);
            });

        } else {
            //setTenant(await getTenant);

            await database.write(async () => {
                await maquinasCollection.create((novaMaquina) => {
                    
                    novaMaquina.nome = nome;
                    novaMaquina.consumoMedio = parseFloat(consumoMedio);
                    novaMaquina.dataCompra = new Date(dataCompra);
                    novaMaquina.modelo = modelo;
                    novaMaquina.potencia = parseFloat(potencia);
                    novaMaquina.tipo = tipo.value;
                    novaMaquina.tipoCalculo = tipoCalculo.value;
                    novaMaquina.tipoCombustivel = tipoCombustivel.value;
                    novaMaquina.tipoInsumo = tipoInsumo.value;
                    novaMaquina.valor = parseFloat(valor);
                    novaMaquina.vidaUtil = parseInt(vidaUtil);
                    //@ts-ignore
                    novaMaquina.tenant.set(tenant);
                    console.log('novaMaquina', novaMaquina);


                });
            }).then(() => {

                setGravidade('sucesso');
                setMensagem('Máquina criada com sucesso!');
                setToast(true);

                console.log("Máquina criada com sucesso!");
            }).catch((error) => {
                setGravidade('erro');
                setMensagem('Erro ao criar máquina');
                setToast(true);
                console.error("Erro ao criar máquina:", error);
            });

        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} >
            <Titulo titulo={titulo}></Titulo>

            {/* {
                FormFactory.createForm(maquinasCollection, montaObject, [], maquina)
            } */}

            <Select
                dados={tiposInsumosMecanicos}
                onChange={(value) => setTipoInsumo(value)} 
                value={tipoInsumo}
                placeholder="Selecione o tipo de insumo" 
                label="Tipo de insumo"
            />

            <Select
                dados={tipos}
                onChange={(value) => setTipo(value)} 
                value={tipo}
                placeholder={"Selecione o tipo de " + (tipoInsumo?.label ?? 'Máquina/Implemento')} 
                label={"Tipo de " + (tipoInsumo?.label ?? 'Máquina/Implemento')}
            />

            <Select
                dados={tiposCombustiveis}
                onChange={(value) => setTipoCombustivel(value)} 
                value={tipoCombustivel}
                placeholder="Selecione o tipo de combustível" 
                label="Tipo de combustível"
            />

            <Select
                dados={tiposCalculos}
                onChange={(value) => setTipoCalculo(value)} 
                value={tipoCalculo}
                placeholder="Selecione o tipo de cálculo" 
                label="Tipo de cálculo da despesa"
            />

            <Input
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

            <InputData
                label="Data de compra"
                placeholder="Selecione a data de compra"
                value={dataCompra}
                //@ts-ignore
                onChangeText={(text) => setDataCompra(text)}
            />

            <Input
                label="Vida útil"
                placeholder="0"
                value={vidaUtil}
                onChangeText={(text) => setVidaUtil(text)}
                keyboard="numeric"
            />

            <Botao nome="Salvar" onPress={salvarMaquina} disabled={false} />

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