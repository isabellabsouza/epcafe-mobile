import { useEffect, useState } from "react";
import Input from "../Input";
import FormFactory from "./FormFactory";
import MontaObject from "./MontaObject";
import InputData from "../InputData";

interface props {
    name: string,
    montaObject: MontaObject,
    tipo: string
}
export default function FormInput({ name, montaObject, tipo }: props) {
    
    const [value, setValue] = useState('');

    useEffect(() => {
        montaObject.add(name, '');
    },[])

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const label = name.toLowerCase().replace(/\_/g, ' ').split(' ')
                    .map(word => capitalize(word)).join(' ');

    const onInput = (text: string) => {
        montaObject.add(name, text);
        setValue(text);
    }

    if(tipo === 'data'){
        return <InputData label={label} placeholder={label} value={value} onChangeText={onInput} />
    } else {

        return <Input key={name} label={label} placeholder={label} value={value} onChangeText={onInput} />
    }



}

// create capitalize function