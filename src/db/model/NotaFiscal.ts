import { Model } from "@nozbe/watermelondb";
import { date, field, relation, text, readonly } from "@nozbe/watermelondb/decorators";
import Unidade from "./Unidade";
import Tenant from "./Tenant";

export default class NotaFiscal extends Model {
    static table = 'nota_fiscal'

    @date('data_emissao') dataEmissao!: Date;
    @text('descricao') descricao!: string;
    @text('numero') numero!: string;
    @text('url') url!: string;
    @field('valor_total') valorTotal!: number;
    @relation('unidade', 'unidade_id') unidade!: Unidade;
    @relation('tenant', 'tenant_id') tenant!: Tenant;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}