import Botao from '@/components/Botao';
import InfoLinha from '@/components/InfoLinha';
import Titulo from '@/components/Titulo';
import Toast from '@/components/toast/Toast';
import database, { maquinasCollection } from '@/db';
import Maquina from '@/db/model/Maquina';
import { supabase } from '@/lib/supabase';
import TipoMecanico from '@/utils/enums/TipoMecanico';
import { withObservables } from '@nozbe/watermelondb/react';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';

function detalharMaquina({ maquina }: { maquina: Maquina }) {

    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);

    //variáveis para o toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    console.log("Maquina:", maquina);

    if (!maquina) {
        return <Text>Máquina não encontrada.</Text>;
    }

    console.log("Maquina:", maquina);

    const excluir = async () => {
        await database.write(async () => {
            await maquina.markAsDeleted();
        });
        setGravidade('sucesso');
        setMensagem('Máquina excluída com sucesso!');    
        setToast(true);
        setTimeout(() => {router.back()}, 3000);
        console.log("Máquina excluída com sucesso.");
    };
    supabase.auth.getUser().then(user => console.log(user));
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
                            Tem certeza que deseja excluir a máquina {maquina.nome}?
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