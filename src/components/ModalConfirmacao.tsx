import React from 'react';
import { Modal, View, Text, Alert, StyleSheet } from 'react-native';
import Botao from "@/src/components/Botao";

interface ModalConfirmacaoProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ModalConfirmacao ({ visible, onClose, onConfirm }: ModalConfirmacaoProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => onClose()}
        >
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTexto}>
                        Essa ação é irreversível.
                    </Text>
                    <View style={styles.botoesModal}>
                        <Botao
                            nome="Excluir"
                            onPress={() => {
                                onConfirm();
                                onClose();
                            }}
                            disabled={false}
                        />
                        <Botao
                            nome="Cancelar"
                            onPress={onClose}
                            disabled={false}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    }
});