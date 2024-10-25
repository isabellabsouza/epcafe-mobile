import { mySync } from "@/src/db/sync";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { TouchableOpacity, StyleSheet } from "react-native";

export default function SyncButton() {
    const netInfo = useNetInfo();

    return (
        <TouchableOpacity 
            onPress={mySync}
            disabled={!netInfo.isConnected}
            style={[
                styles.button,
                !netInfo.isConnected && styles.disabledButton, // Aplica estilo se desativado
            ]}
        >
            <MaterialCommunityIcons 
                name="cloud-sync-outline" 
                size={32} 
                color={!netInfo.isConnected ? "gray" : "black"}
            />
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        opacity: 1,
    },
    disabledButton: {
        opacity: 0.5, 
    },
});