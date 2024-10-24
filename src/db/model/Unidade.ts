import { Model } from "@nozbe/watermelondb";
import { readonly, relation, text, date } from "@nozbe/watermelondb/decorators";
import Tenant from "./Tenant";

export default class Unidade extends Model {
    static table = 'unidade'

    @text('contato') contato!: string;
    @text('nome') nome!: string;
    @text('tipo') tipo!: string;
    @relation('tenant', 'tenant_id') tenant!: Tenant;
    @readonly @text('endereco_id') endereco!: string;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}