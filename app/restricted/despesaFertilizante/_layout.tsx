import { Stack } from "expo-router";
import SyncButton from "@/components/navigation/SyncButton";

export default function DespesasFertilizantesLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerRight: () => <SyncButton />
        }} >

        </Stack>
    )
}