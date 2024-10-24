import Botao from '@/src/components/Botao';
import InfoLinha from '@/src/components/InfoLinha';
import ModalConfirmacao from '@/src/components/ModalConfirmacao';
import Titulo from '@/src/components/Titulo';
import Toast from '@/src/components/toast/Toast';
import MaquinaController from '@/src/controller/MaquinaController';
import { maquinasCollection } from '@/src/db';
import Maquina from '@/src/db/model/Maquina';
import TipoMecanico from '@/src/utils/enums/TipoMecanico';
import { withObservables } from '@nozbe/watermelondb/react';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

function detalharMaquina({ maquina }: { maquina: Maquina }) {

    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);

    //variáveis para o toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    if (!maquina) {
        return <Text>Máquina não encontrada.</Text>;
    }


    const excluir = async () => {
        const sucesso = await MaquinaController.excluirMaquina(maquina);

        if (sucesso) {
            setGravidade('sucesso');
            setMensagem('Máquina excluída com sucesso!');
            setToast(true);
            setTimeout(() => {router.back()}, 2000);
        } else {
            setGravidade('erro');
            setMensagem('Erro ao excluir a máquina!');
            setToast(true);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Titulo titulo={maquina.nome} />

            <InfoLinha label="Nome" valor={maquina.nome} />
            <InfoLinha label="Tipo" valor={TipoMecanico.getNome(maquina.tipoInsumo, maquina.tipo)} />
            <InfoLinha label="Modelo" valor={maquina.modelo} />
            <InfoLinha label="Data de compra" valor={new Date(maquina.dataCompra).toLocaleDateString()} />
            <InfoLinha label="Consumo Médio" valor={maquina.consumoMedio} />
            <InfoLinha label="Potência" valor={maquina.potencia + " cv"} />
            <InfoLinha label="Tipo de cálculo" valor={maquina.tipoCalculo} />
            <InfoLinha label="Tipo de combustível" valor={maquina.tipoCombustivel} />
            <InfoLinha label="Tipo de insumo" valor={maquina.tipoInsumo} />
            <InfoLinha 
                label="Valor" 
                valor={new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                }).format(maquina.valor)
                .replace('R$', 'R$ ')
                } 
            />
            <InfoLinha label="Vida Útil" valor={maquina.vidaUtil + " anos"} />

            <ModalConfirmacao 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={excluir}
            />

            

            <View style={styles.botoesContainer}>
                <Botao nome="Editar" rota={`/restricted/maquinas/criar?id=${id}`} />
                <Botao nome="Excluir" onPress={() => setModalVisible(true)} />
            </View>

            {toast && 
                <Toast setToast={ setToast } 
                    mensagem={mensagem} 
                    gravidade={gravidade} 
                />
            }

        </ScrollView>
    );
}

const enhance = withObservables(
    ['id'], // Dependências para observar
    ({ id }: { id: string }) => {
        if (!id) {
            throw new Error("ID não encontrado.");
        }
        return {
            maquina: maquinasCollection.findAndObserve(id),
        };
    }
);

function EnhancedDetalharMaquina() {
    const { id } = useLocalSearchParams(); // Pegando o ID da máquina
    if (!id) {
        return <Text>ID da máquina não foi fornecido.</Text>;
    }

    const EnhancedComponent = enhance(detalharMaquina);
    return <EnhancedComponent id={String(id)} />;
}

export default EnhancedDetalharMaquina;

const styles = StyleSheet.create({
    scrollContent: {
        padding: 17,
        flexGrow: 1,
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
})