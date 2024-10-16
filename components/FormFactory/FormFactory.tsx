import { Collection } from "@nozbe/watermelondb";
import FormInput from "./FormInput";
import MontaObject from "./MontaObject";


class FormFactory {
    static createForm(collection: Collection<any>, montaObject: MontaObject, columnFilter: string[] = []){

        const hardFilter = [
            'id',
            'created_at',
            'updated_at',
            'deleted_at',
        ];      
        
        console.log(collection.schema.columns);
        let columns = collection
                        .schema
                        .columnArray
                        .filter(column => !hardFilter.includes(column.name)) // filtrando as colunas padrão
                        .filter(column => !column.name.match(/_id$/)); // filtrando as colunas que terminam com _id (relations)

        if(columnFilter.length > 0)
            columns = columns.filter(column => !columnFilter.includes(column.name)); // filtrando as colunas passadas por parâmetro

        for(let i = 0; i < columns.length; i++){
            console.log(columns[i].name, columns[i].type);
        }
        return columns.map(column => FormFactory.createInput(column, montaObject));
            
    }

    private static createInput(column: {name: string, type: string}, montaObject: MontaObject){
                        
        switch(column.type){
            case 'string':
            case 'number':
                if(column.name.toLowerCase().includes('data')){
                    return <FormInput key={column.name} name={column.name} montaObject={montaObject} tipo="data" />
                }
            default:
                return <FormInput key={column.name} name={column.name} montaObject={montaObject} tipo="texto" />
        }
    }

    

}

export default FormFactory;