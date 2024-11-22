import { Model } from "@nozbe/watermelondb";
import { relation, text, readonly, date } from "@nozbe/watermelondb/decorators";
import Tenant from "./Tenant";

export default class Usuario extends Model {
    static table = 'usuario'

    @text('nome') nome!: string;
    @text('role') role!: string;
    @text('status') status!: string;
    @relation('tenant', 'tenant_id') tenant!: Tenant;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}