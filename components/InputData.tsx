import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker'
import Input from './Input';
import { on } from '@nozbe/watermelondb/QueryDescription';
import AntDesign from '@expo/vector-icons/AntDesign';

interface InputDataProps {
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void
}

export default function InputData({ label, placeholder, value, onChangeText }: InputDataProps) {

    const [dataSelecionada, setDataSelecionada] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const formatarData = (data: string) => {
        const [ano, mes, dia] = data.split('/'); 
        return `${dia}/${mes}/${ano}`; 
    };

    const handleDateChange = (date: string) => {
        setDataSelecionada(date); 
        onChangeText(formatarData(date)); 
        setIsOpen(false); 
    };
    //value={dataSelecionada ? formatarData(dataSelecionada) : ''}
    
    return (
        <>
        
            <Input
                label={label}
                placeholder={placeholder}
                value={dataSelecionada}
                onChangeText={onChangeText}
                onPress={() => setIsOpen(!isOpen)}
                showKeyboard={false}
            />
            {isOpen && (
                <DatePicker
                    onDateChange={setDataSelecionada}
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