import Botao from '@/components/Botao';
import InfoFerTalhao from '@/components/despesaFerTalhao/InfoFerTalhao';
import InfoLinha from '@/components/InfoLinha';
import Titulo from '@/components/Titulo';
import Toast from '@/components/Toast/Toast';
import database, { despesasFerTalhoesCollection, despesasFertilizantesCollection, fertilizantesCollection, notasCollection } from '@/db';
import DespesaFertilizante from '@/db/model/DespesaFertilizante';
import TipoMecanico from '@/utils/enums/TipoMecanico';
import { Q } from '@nozbe/watermelondb';
import { withObservables } from '@nozbe/watermelondb/react';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';


function detalharDespesaFertilizante({ despesaFertilizante }: { despesaFertilizante: DespesaFertilizante }) {

    const { id } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [despesasFerTalhoes, setDespesasFerTalhoes] = useState<any[]>([]);

    //variáveis para o toast
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    //dados para exibir
    const [nomeFertilizante, setNomeFertilizante] = useState('');
    const [numNotaFiscal, setNumNotaFiscal] = useState('');

    if (!despesaFertilizante) {
        return <Text>Despesa não encontrada.</Text>;
    }

    useEffect(() => {
        const buscarDespesasFerTalhoes = async() => {
            try{

                const distribuiçõesEncontradas = await despesasFerTalhoesCollection.query(
                    Q.where('despesa_id', despesaFertilizante.id)
                )
                .fetch();
                setDespesasFerTalhoes(distribuiçõesEncontradas);
            }catch(error){
                console.error("Erro ao buscar a distribuição dos talhões: ", error);
            }
        }
        buscarDespesasFerTalhoes();
    }, []);

    const excluir = async () => {
        await database.write(async () => {
            await despesaFertilizante.markAsDeleted();
        });
        setGravidade('sucesso');
        setMensagem('Despesa excluída com sucesso!');    
        setToast(true);
        setTimeout(() => {router.back()}, 3000);
        console.log("Despesa excluída com sucesso.");
    };

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const fertilizante = await fertilizantesCollection.find(despesaFertilizante.fertilizante.id);
                setNomeFertilizante(fertilizante.nome);

                const notaFiscal = await notasCollection.find(despesaFertilizante.notaFiscal.id);
                setNumNotaFiscal(notaFiscal.numero);
            }catch(error){
                console.error("Erro ao buscar os dados para exibição: ", error);
            }
        }
        buscarDados();
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Titulo titulo="Despesa" />

            <InfoLinha label="Data" valor={despesaFertilizante.data.toLocaleDateString()} />
            <InfoLinha label="Fertilizante" valor={nomeFertilizante} />
            <InfoLinha label="Nota Fiscal" valor={numNotaFiscal} />
            <InfoLinha 
                label="Valor Total" 
                valor={new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                }).format(despesaFertilizante.valorTotal)
                .replace('R$', 'R$ ')
                }
            />

            <Titulo titulo="Distribuição nos Talhões" />

            {despesasFerTalhoes &&
                despesasFerTalhoes.map((despesaFerTalhao, index) => 
                    <InfoFerTalhao 
                        key={index}
                        medida={despesaFertilizante.medida} 
                        talhaoId={despesaFerTalhao.talhao.id} 
                        quantidade={despesaFerTalhao.quantidade}
                        valor={despesaFerTalhao.valor} 
                    />
                )
            }

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
                            Tem certeza que deseja excluir a despesa?
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
                <Botao nome="Editar" rota={`/restricted/despesaFertilizante/criar?id=${id}`} />
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
            despesaFertilizante: despesasFertilizantesCollection.findAndObserve(id),
        };
    }
);

function EnhancedDetalharDespesaFertilizante() {
    const { id } = useLocalSearchParams(); // Pegando o ID da máquina
    if (!id) {
        return <Text>ID da despesa não foi fornecido.</Text>;
    }

    const EnhancedComponent = enhance(detalharDespesaFertilizante);
    return <EnhancedComponent id={String(id)} />;
}

export default EnhancedDetalharDespesaFertilizante;

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