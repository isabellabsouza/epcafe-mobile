import { useEffect, useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import Input from './Input';

interface InputDataProps {
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (text: Date) => void
}

export default function InputData({ label, placeholder, value, onChangeText }: InputDataProps) {

    const [dataSelecionada, setDataSelecionada] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const formatarData = (data: string) => {
        const [ano, mes, dia] = data.split('/'); 
        return `${dia}/${mes}/${ano}`; 
    };

    useEffect(() => {
        if(dataSelecionada){
            onChangeText(new Date(dataSelecionada.replaceAll("/", "-")));
        }
    }, [dataSelecionada])

    const handleDateChange = (date: string) => {
        setDataSelecionada(date); 
        onChangeText(new Date(date.replaceAll("/", "-"))); 
        setIsOpen(false); 
    };
    //value={dataSelecionada ? formatarData(dataSelecionada) : ''}
    
    return (
        <>
        
            <Input
                label={label}
                placeholder={placeholder}
                value={dataSelecionada}
                onChangeText={(text) => {
                    console.log('riaje', text)    
                    onChangeText(new Date(text.replaceAll("/", "-")))
                }}
                onPress={() => setIsOpen(!isOpen)}
                showKeyboard={false}
            />
            {isOpen && (
                <DatePicker
                    onDateChange={(valor) => {console.log(new Date(valor.replaceAll("/", "-"))); setDataSelecionada(valor)}}
                    mode='calendar'
                    options={{
                        backgroundColor: '#ebe9e9',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                    }}
                    style={{ borderRadius: 20 }}
                />
            )}
        </>
    )
}