import { StyleSheet, TouchableOpacity, Text, Modal, Alert, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import { router, useNavigation } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { supabase } from "@/lib/supabase";

interface BotaoMenuProps {
    titulo: string;
    rota: string;
}
export default function BotaoMenu() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleNavigation = (route: string) => {
        setModalVisible(false);
        //navigation.navigate();
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Você foi desconectado.');
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>

                <Entypo name="dots-three-vertical" size={24} color="black" />

            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.menu}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => router.navigate('/selecionarUnidade')}>
                            <FontAwesome5 name="house-user" size={22} color="black" />
                            <Text style={styles.menuText}>Trocar de unidade</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={
                                () => supabase.auth.signOut()
                                    .then(
                                        () => router.navigate('/login')
                                    )
                            }
                            style={styles.menuItem}
                        >
                            <AntDesign name="logout" size={22} color="black" />
                            <Text style={styles.menuText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    menuButton: {
        padding: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    menu: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        position: 'absolute',
        top: 70, // Distância do topo do botão
        right: 10,
        gap: 10,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 17
    },
    menuText: {
        fontSize: 16,
    },
})