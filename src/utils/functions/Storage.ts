import AsyncStorage from '@react-native-async-storage/async-storage';

export const buscarTenantId = async (): Promise<string | null> => {
    try {
        const tenantId = await AsyncStorage.getItem('tenantId');
        return tenantId ?? '';
    } catch (error) {
        console.error("Erro ao buscar o tenant:", error);
        return '';
    }
};

export const buscarUnidadeId = async (): Promise<string | null> => {
    try {
        const unidadeId = await AsyncStorage.getItem('unidadeId');
        return unidadeId ?? '';
    } catch (error) {
        console.error("Erro ao buscar a unidade:", error);
        return '';
    }
}