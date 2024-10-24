import { useEffect, useState } from "react";
import Input from "../Formulario/Input";
import FormFactory from "./FormFactory";
import MontaObject from "./MontaObject";
import InputData from "../Formulario/InputData";

interface props {
    name: string,
    montaObject: MontaObject,
    tipo: string,
    valor?: string
}
export default function FormInput({ name, montaObject, tipo, valor}: props) {
    
    const [value, setValue] = useState('');
    const [firstLoad, setFirstLoad] = useState(true);

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const label = name.toLowerCase().replace(/\_/g, ' ').split(' ')
                    .map(word => capitalize(word)).join(' ');

    const onInput = (text: string) => {
        console.log(tipo)
        if(tipo == 'number'){
            montaObject.add(name, parseInt(text));
        }else{
            montaObject.add(name, text);
        }
        setValue(text);
    }


    setTimeout(() => {
        if(firstLoad){
            setFirstLoad(false);
            onInput(valor ?? '');
        }
    }, 100);

    if(tipo === 'data'){
        return <InputData label={label} placeholder={label} value={value} onChangeText={onInput} />
    } else {

        return <Input key={name} label={label} placeholder={label} value={value} onChangeText={onInput} />
    }



}

// create capitalize function