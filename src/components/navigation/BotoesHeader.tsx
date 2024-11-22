import { StyleSheet, View } from "react-native";
import SyncButton from "./SyncButton";
import BotaoMenu from "./BotaoMenu";

export default function BotoesHeader() {
    return (
        <View style={styles.botoesContainer}>
            <SyncButton />
            <BotaoMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    botoesContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10
    }
})