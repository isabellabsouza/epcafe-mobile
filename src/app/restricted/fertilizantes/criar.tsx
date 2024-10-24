import Botao from "@/src/components/Botao";
import Input from "@/src/components/Formulario/Input";
import Select from "@/src/components/Formulario/Select";
import Titulo from "@/src/components/Titulo";
import Toast from "@/src/components/toast/Toast";
import FertilizanteController from "@/src/controller/FertilizanteController";
import Fertilizante from "@/src/db/model/Fertilizante";
import TipoFertilizante from "@/src/utils/enums/TipoFertilizante";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CriarFertilizante() {

    const titulo = "Adicionar Fertilizante ou Defensivo";

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

    const salvar = async () => {
        const fertilizanteData: Partial<Fertilizante> = {
            nome: nome,
            tipo: tipo.value,
        }

        const sucesso = await FertilizanteController.salvarFertilizante(fertilizanteData);

        if (sucesso) {
            setNome('');
            setTipo({ label: '', value: '' });
            
            setGravidade('sucesso');
            setMensagem('Fertilizante salvo com sucesso!');
        } else {
            setGravidade('erro');
            setMensagem('Erro ao salvar o fertilizante!');
        }

        setToast(true);
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

            <Botao nome="Salvar" onPress={salvar} disabled={false} />

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