import { Slot, Stack } from "expo-router";

export default function MaquinasLayout() {
    return (
        <Stack screenOptions={{headerShown:true}} >
            {/* <Stack.Screen name="index" options={{ headerTitle: "Máquinas" }} /> */}
                {/* {() => 
                }  Use o Slot como filho de Stack.Screen */}
                {/* <Slot /> */}
            {/* </Stack.Screen> */}
        </Stack>
    )
}