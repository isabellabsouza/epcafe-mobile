import { Slot, Stack, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RestrictedLayout() {
    return (
        
        <SafeAreaView style={{ flex: 1 }}> 
            <Slot />
        </SafeAreaView>
    )
}