export default class MontaObject {

    private tupla: { [key: string]: any }[] = [];

    constructor() {
        this.tupla = [];
    }

    public add(key: string, value: any) {
        if(this.tupla.filter(t => Object.keys(t)[0] == key).length > 0){
            this.tupla.find(t => Object.keys(t)[0] == key)![key] = value;    
        }else{
            this.tupla.push({ [key]: value });
        }
    }

    public remove(key: string) {
        this.tupla = this.tupla.filter(t => !t[key]);
    }

    public get() {
        return this.tupla.reduce((acc, curr) => {
            return { ...acc, ...curr };
        }, {});
    }

    public clear() {
        this.tupla = [];
    }

    public update(key: string, value: any) {
        if(this.tupla.find(t => t[key] === value)){
            this.tupla.filter(t => t[key] === value).every(t => delete t[key]);
        }
        this.tupla.push({ [key]: value });
    }

    public getKeys() {
        return this.tupla.map(t => Object.keys(t)[0]);
    }

    public getValues() {
        return this.tupla.map(t => Object.values(t)[0]);
    }

    public getTupla() {
        return this.tupla;
    }

    public setTupla(tupla: { [key: string]: any }[]) {
        this.tupla = tupla;
    }

    public set(key: string, value: any) {
        this.tupla = [{ [key]: value }];
    }

    public getValue(key: string) {
        return this.tupla.find(t => Object.keys(t)[0] === key)![key];
    }


}