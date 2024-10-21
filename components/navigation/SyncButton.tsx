import { mySync } from "@/db/sync";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function SyncButton() {
    return (
        <TouchableOpacity onPress={mySync}>
            <MaterialCommunityIcons name="cloud-sync-outline" size={32} color="black" />
        </TouchableOpacity>
    )
}