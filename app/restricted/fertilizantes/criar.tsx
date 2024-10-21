import Botao from "@/components/Botao";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Titulo from "@/components/Titulo";
import Toast from "@/components/Toast/Toast";
import database, { fertilizantesCollection } from "@/db";
import Fertilizante from "@/db/model/Fertilizante";
import TipoFertilizante from "@/utils/enums/TipoFertilizante";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CriarFertilizante() {

    const { id } = useLocalSearchParams();

    const [fertilizante, setFertilizante] = useState<Fertilizante | null>(null);
    const titulo = id ? "Editar Fertilizante ou Defensivo" : "Adicionar Fertilizante ou Defensivo";

    // variáveis de estado para exibir toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    // variáveis de estado para os campos do formulário
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState<any>({ label: '', value: '' });

    // definição das listas de opções para os selects
    const tipos = Array.from(Object.keys(TipoFertilizante)).map((key, index) => {
        return {
            label: Array.from(Object.values(TipoFertilizante))[index].toString(),
            value: key,
        }
    })

    const salvarFertilizante = async () => {
        await database.write(async () => {
            await fertilizantesCollection.create((novo) => {
                novo.nome = nome;
                novo.tipo = tipo.value;
            }).then(() => {
                setGravidade('sucesso');
                setMensagem('Máquina criada com sucesso!');
                setToast(true);

                console.log("Fertilizante criado com sucesso.");
            }).catch((error) => {
                setGravidade('erro');
                setMensagem('Erro ao criar o fertilizante.');
                setToast(true);
                console.error("Erro ao criar o fertilizante:", error);
            })
        })
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} >
            <Titulo titulo={titulo}></Titulo>

            <Input
                label="Nome"
                value={nome}
                onChangeText={(value) => setNome(value)}
                placeholder="Nome do fertilizante ou defensivo"
            />

            <Select
                dados={tipos}
                onChange={(value) => setTipo(value)}
                value={tipo}
                placeholder="Selecione o tipo de insumo"
                label="Tipo de insumo"
            />

            <Botao nome="Salvar" onPress={salvarFertilizante} disabled={false} />

            {toast &&
                <Toast setToast={setToast}
                    mensagem={mensagem}
                    gravidade={gravidade}
                />
            }

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    scrollContent: {
        padding: 17,
        flexGrow: 1,
    },
})