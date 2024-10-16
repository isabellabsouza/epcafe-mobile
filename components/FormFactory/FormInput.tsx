import { useEffect, useState } from "react";
import Input from "../Input";
import FormFactory from "./FormFactory";
import MontaObject from "./MontaObject";

interface props {
    name: string,
    montaObject: MontaObject
}
export default function FormInput({ name, montaObject }: props) {
    
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

    return <Input key={name} label={label} placeholder={label} value={value} onChangeText={onInput} />


}

// create capitalize function