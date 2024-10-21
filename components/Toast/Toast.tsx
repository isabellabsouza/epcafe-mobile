import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useToast } from './ToastProvider';

interface ToastProps {
    setToast: (toast: boolean) => void;
    mensagem: string;
    gravidade: string;
}

export default function Toast({ setToast, mensagem, gravidade }: ToastProps) {
    const opacity = React.useRef(new Animated.Value(0)).current; 

    function animate() {
        Animated.timing(opacity, {
            toValue: 1, 
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(opacity, {
                toValue: 0,              duration: 1000,
                delay: 2000, 
                useNativeDriver: true,
            }).start(() => {
                setToast(false);
            });
        });
        
    }

    useEffect(() => {
       animate(); 
    }, []);

    //if (!isVisible) return null;

    let icone;
    if (gravidade === 'sucesso') {
        icone = <AntDesign name="checkcircleo" size={24} color="black" />
    } else if (gravidade === 'alerta') {
        icone = <AntDesign name="exclamationcircleo" size={24} color="black" />
    } else if (gravidade === 'erro') {
        icone = <AntDesign name="closecircleo" size={24} color="black" />
    }
    //types of icons: checkcircleo (success), exclamationcircleo (warning), closecircleo(fail)

    return (
        <Animated.View style={[styles.toastContainer, { opacity }]}>
            {icone}
            <Text style={styles.toastText}>{mensagem}</Text>
            {/* <Text style={styles.toastText}>Mensagem</Text> */}
        </Animated.View>

    );
}

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: "row",
        backgroundColor: "#D9D9D9",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        alignItems: "center",
    },
    toastText: {
        marginLeft: 10,
        fontSize: 16,
    },
});
