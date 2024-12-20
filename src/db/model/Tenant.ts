import { readonly, text, date } from "@nozbe/watermelondb/decorators";
import Model, { Associations } from "@nozbe/watermelondb/Model";
import Maquina from "./Maquina";

export default class Tenant extends Model {
    static table = 'tenant';
    
    @text('tenant') tenant!: string;
    @text('tipo_plano') tipoPlano!: string;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}