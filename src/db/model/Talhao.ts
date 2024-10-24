import { field, relation, text, readonly, date } from "@nozbe/watermelondb/decorators";
import Model from "@nozbe/watermelondb/Model";
import Unidade from "./Unidade";
import Tenant from "./Tenant";

export default class Talhao extends Model {
    static table = 'talhao'

    @field('area') area!: number;
    @text('nome') nome!: string;
    @relation('unidade', 'unidade_id') unidade!: Unidade;
    @relation('tenant', 'tenant_id') tenant!: Tenant;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}