import SyncButton from "@/components/navigation/SyncButton";
import { Stack } from "expo-router";

export default function DespesasMaquinasLayout() {
    return (
        <Stack screenOptions={{
            headerShown:true,
            headerRight: () => <SyncButton />
        }} >
            
        </Stack>
    )
}