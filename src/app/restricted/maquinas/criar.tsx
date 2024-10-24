import Botao from "@/src/components/Botao";
import Input from "@/src/components/Formulario/Input";
import InputData from "@/src/components/Formulario/InputData";
import Select from "@/src/components/Formulario/Select";
import Titulo from "@/src/components/Titulo";
import Toast from "@/src/components/toast/Toast";
import MaquinaController from "@/src/controller/MaquinaController";
import Maquina from "@/src/db/model/Maquina";
import TipoCalculo from "@/src/utils/enums/TipoCalculo";
import TipoCombustivel from "@/src/utils/enums/TipoCombustivel";
import TipoInsumoMecanico from "@/src/utils/enums/TipoInsumoMecanico";
import TipoMecanico from "@/src/utils/enums/TipoMecanico";
import { buscarTenantId } from "@/src/utils/functions/Storage";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CriarMaquina() {

    const { id } = useLocalSearchParams();

    const [maquina, setMaquina] = useState<Maquina | null>(null);
    const titulo = id ? "Editar Máquina ou Implemento" : "Adicionar Máquina ou Implemento";

    // variáveis de estado para exibir toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    // variáveis de estado para os campos do formulário
    const [tipoInsumo, setTipoInsumo] = useState<any>();
    const [tipo, setTipo] = useState<any>({ label: '', value: '' });
    const [tipoCombustivel, setTipoCombustivel] = useState<any>({ label: '', value: '' });
    const [tipoCalculo, setTipoCalculo] = useState<any>({ label: '', value: '' });
    const [potencia, setPotencia] = useState('');
    const [consumoMedio, setConsumoMedio] = useState('');
    const [nome, setNome] = useState('');
    const [modelo, setModelo] = useState('');
    const [valor, setValor] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [vidaUtil, setVidaUtil] = useState('');
    const [tenant, setTenant] = useState<string | null>(null);

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
        if (tipoInsumo?.label === '') {
            setTipos([]);
            return;
        }
        if (tipoInsumo?.label === TipoInsumoMecanico.MAQUINA) {
            console.log("setting tipos maquina")
            setTipos(Array.from(Object.keys(TipoMecanico.MAQUINAS)).map((key, index) => {
                return {
                    label: Array.from(Object.values(TipoMecanico.MAQUINAS))[index].nome,
                    value: key,
                }
            }))
        }
        if (tipoInsumo?.label === TipoInsumoMecanico.IMPLEMENTO) {
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
        const buscarDados = async () => {
            const tenantId = await buscarTenantId();
            console.log('tenantId', tenantId)
            setTenant(tenantId);

            if (id) {

                const maquinaEncontrada = await MaquinaController.buscarMaquina(String(id));

                if (maquinaEncontrada) {

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
                }
            };

        }
        buscarDados();
    }, [id]);

    const salvar = async () => {
        const maquinaData = {
            nome,
            consumoMedio: parseFloat(consumoMedio),
            dataCompra: new Date(dataCompra),
            modelo,
            potencia: parseFloat(potencia),
            tipo: tipo.value,
            tipoCalculo: tipoCalculo.value,
            tipoCombustivel: tipoCombustivel.value,
            tipoInsumo: tipoInsumo.value,
            valor: parseFloat(valor),
            vidaUtil: parseInt(vidaUtil),
            tenant,
        };

        //@ts-ignore
        const sucesso = await MaquinaController.salvarMaquina(maquinaData, maquina);
        if (sucesso) {

            setNome('');
            setConsumoMedio('');
            setDataCompra('');
            setModelo('');
            setPotencia('');
            setTipo({ label: '', value: '' });
            setTipoCalculo({ label: '', value: '' });
            setTipoCombustivel({ label: '', value: '' });
            setTipoInsumo({ label: '', value: '' });
            setValor('');
            setVidaUtil('');

            setGravidade('sucesso');
            setMensagem(maquina ? 'Máquina atualizada com sucesso!' : 'Máquina criada com sucesso!');
        } else {
            setGravidade('erro');
            setMensagem(maquina ? 'Erro ao atualizar a máquina' : 'Erro ao criar máquina');
        }
        setToast(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} >
            <Titulo titulo={titulo}></Titulo>

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
})