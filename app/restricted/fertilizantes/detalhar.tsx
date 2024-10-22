import Botao from '@/components/Botao';
import InfoLinha from '@/components/InfoLinha';
//import ModalConfirmacao from '@/components/ModalConfirmacao';
import Titulo from '@/components/Titulo';
import Toast from '@/components/toast/Toast';
import database, { fertilizantesCollection } from '@/db';
import Fertilizante from '@/db/model/Fertilizante';
import { withObservables } from '@nozbe/watermelondb/react';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';


function detalharFertilizante({ fertilizante }: { fertilizante: Fertilizante }) {

    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    if (!fertilizante) {
        return <Text>Fertilizante não encontrada.</Text>;
    }

    const excluir = async () => {
        await database.write(async () => {
            await fertilizante.markAsDeleted();
        }).then(() => {

            setGravidade('sucesso');
            setMensagem('Fertilizante excluído com sucesso!');
            setToast(true);
            //setTimeout(() => { router.back() }, 3000);
            console.log("Fertilizante excluído com sucesso.");
        }).catch((error) => {
            console.error("Erro ao excluir o fertilizante:", error);
            setGravidade('erro');
            setMensagem('Erro ao excluir o fertilizante.');
            setToast(true);
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Titulo titulo={fertilizante.nome} />

            <InfoLinha label="Nome" valor={fertilizante.nome} />
            <InfoLinha label="Vida Útil" valor={fertilizante.tipo} />

            {toast &&
                <Toast setToast={setToast}
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
            fertilizante: fertilizantesCollection.findAndObserve(id),
        };
    }
);

function EnhancedDetalharFertilizante() {
    const { id } = useLocalSearchParams(); // Pegando o ID da máquina
    if (!id) {
        return <Text>ID da máquina não foi fornecido.</Text>;
    }

    const EnhancedComponent = enhance(detalharFertilizante);
    return <EnhancedComponent id={String(id)} />;
}

export default EnhancedDetalharFertilizante;

const styles = StyleSheet.create({
    scrollContent: {
        padding: 17,
        flexGrow: 1,
    }
})