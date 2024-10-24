// import { Modal, View, Text, StyleSheet, Alert } from "react-native";
// import Botao from "./Botao";

// export default function ModalConfirmacao() {
//     return (
//         <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     Alert.alert('Modal has been closed.');
//                     setModalVisible(!modalVisible);
//                 }}
//             >
//                 <View style={styles.overlay}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modalTexto}>
//                             Tem certeza que deseja excluir a máquina {fertilizante.nome}?
//                         </Text>
//                         <View style={styles.botoesModal}>
//                             <Botao
//                                 nome="Excluir"
//                                 onPress={() => {
//                                     excluir();
//                                     setModalVisible(!modalVisible);
//                                 }}
//                                 disabled={false}
//                             />
//                             <Botao
//                                 nome="Cancelar"
//                                 onPress={() => setModalVisible(!modalVisible)}
//                                 disabled={false}
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//     )
// }

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: '#f5f5f5',
//         borderRadius: 20,
//         padding: 25,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     botoesModal: {
//         flexDirection: 'row',
//         gap: 15,
//     },
//     modalTexto: {
//         fontSize: 20,
//         textAlign: 'center',
//     },
// })