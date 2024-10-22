import Botao from '@/components/Botao';
import InfoLinha from '@/components/InfoLinha';
import Titulo from '@/components/Titulo';
import Toast from '@/components/toast/Toast';
import database, { despesasMaquinasCollection } from '@/db';
import DespesaMaquina from '@/db/model/DespesaMaquina';
import { withObservables } from '@nozbe/watermelondb/react';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';

function detalharDespesaMaquina({ despesaMaquina }: { despesaMaquina: DespesaMaquina }) {

    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);

    //variáveis para o toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    if (!despesaMaquina) {
        return <Text>Despesa não encontrada.</Text>;
    }

    console.log("DespesaMaquina:", despesaMaquina);

    const excluir = async () => {
        await database.write(async () => {
            await despesaMaquina.markAsDeleted();
        });
        setGravidade('sucesso');
        setMensagem('Despesa excluída com sucesso!');    
        setToast(true);
        setTimeout(() => {router.back()}, 3000);
        console.log("Despesa excluída com sucesso.");
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Titulo titulo="Despesa" />

            <InfoLinha label="Data" valor={despesaMaquina.data.toLocaleDateString()} />
            <InfoLinha label="Distância Trabalhada" valor={String(despesaMaquina.distanciaTrabalhada)} />
            <InfoLinha label="Fator de Potência" valor={despesaMaquina.fatorPotencia} />
            <InfoLinha label="Preço do Combustível" valor={despesaMaquina.precoUnitarioCombustivel} />
            <InfoLinha label="Unidade em Horas" valor={despesaMaquina.unidadeHoras ? 'Sim' : 'Não'} />
            <InfoLinha label="Tempo Trabalhado" valor={String(despesaMaquina.tempoTrabalhado)} />
            <InfoLinha label="Máquina" valor={despesaMaquina.maquina.id} />
            <InfoLinha label="Valor Total" valor={despesaMaquina.valorTotal} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTexto}>
                            Tem certeza que deseja excluir a despesa com ?
                        </Text>
                        <View style={styles.botoesModal}>
                            <Botao
                                nome="Excluir"
                                onPress={() => {
                                    excluir();
                                    setModalVisible(!modalVisible);
                                }}
                                disabled={false}
                            />
                            <Botao
                                nome="Cancelar"
                                onPress={() => setModalVisible(!modalVisible)}
                                disabled={false}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            

            <View style={styles.botoesContainer}>
                <Botao nome="Editar" rota={`/restricted/despesaMaquina/criar?id=${id}`} />
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
            despesaMaquina: despesasMaquinasCollection.findAndObserve(id),
        };
    }
);

function EnhancedDetalharDespesaMaquina() {
    const { id } = useLocalSearchParams(); // Pegando o ID da máquina
    if (!id) {
        return <Text>ID da despesa não foi fornecido.</Text>;
    }

    const EnhancedComponent = enhance(detalharDespesaMaquina);
    return <EnhancedComponent id={String(id)} />;
}

export default EnhancedDetalharDespesaMaquina;

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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    botoesModal: {
        flexDirection: 'row',
        gap: 15,
    },
    modalTexto: {
        fontSize: 20,
        textAlign: 'center',
    },
})