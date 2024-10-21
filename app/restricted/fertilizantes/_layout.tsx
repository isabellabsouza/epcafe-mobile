import SyncButton from "@/components/navigation/SyncButton";
import { Stack } from "expo-router";

export default function RestrictedLayout() {
    return (

        <Stack screenOptions={{
            headerShown:true,
            headerRight: () => <SyncButton />
            }} >
            
        </Stack>
    )
}
