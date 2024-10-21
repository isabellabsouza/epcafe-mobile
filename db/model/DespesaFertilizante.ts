import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation, text } from "@nozbe/watermelondb/decorators";
import Fertilizante from "./Fertilizante";
import NotaFiscal from "./NotaFiscal";
import Tenant from "./Tenant";
import Unidade from "./Unidade";

export default class DespesaFertilizante extends Model {
    static table = 'despesa_fertilizante'

    @date('data') data!: Date;
    @text('medida') medida!: string;
    @field('valor_total') valorTotal!: number;
    @relation('fertilizante', 'fertilizante_id') fertilizante!: Fertilizante;
    @relation('tenant', 'tenant_id') tenant!: Tenant;
    @relation('unidade', 'unidade_id') unidade!: Unidade;
    @relation('nota_fiscal', 'nota_fiscal_id') notaFiscal!: NotaFiscal;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}